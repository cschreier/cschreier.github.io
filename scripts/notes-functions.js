'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJson = localStorage.getItem('notes')

    try {
        return notesJson ? JSON.parse(notesJson) : []
    } catch (error) {
        return []
    }
    
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')


    // setup the note title text
    textEl.textContent = note.title.length > 0 ? note.title : "Unnamed note"
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt)
                return -1
            else if (a.updatedAt < b.updatedAt)
                return 1
            else
                return 0
        })
    }
    else if (sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt)
                return -1
            else if (a.createdAt < b.createdAt)
                return 1
            else
                return 0
        })
    }
    else if (sortBy === 'alphabetically'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1
            else if (a.title.toLowerCase() > b.title.toLowerCase())
                return 1
            else
                return 0
        })
    }
        
}

// Render application notes
const renderNotes = (notes, filters) => {
    const notesEle = document.querySelector('#notes')

    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(c => c.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesEle.innerHTML = ""

    if(filteredNotes.length > 0){
        filteredNotes.forEach(note => {
            const noteEl = generateNoteDOM(note)
            notesEle.appendChild(noteEl)   
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEle.appendChild(emptyMessage)
    }
    
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex(c => c.id === id)
    
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}.`