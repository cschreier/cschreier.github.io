'use strict'

const titleEle = document.querySelector('#note-title')
const bodyEle = document.querySelector('#note-body')
const removeEle = document.querySelector('#remove-note')
const dateEle = document.querySelector('#last-edited')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(c => c.id === noteId)

if(!note)
    location.assign('/index.html')

titleEle.value = note.title
bodyEle.value = note.body
const lastEditedHours = moment().hour() - moment(note.updatedAt).hour()
dateEle.textContent = generateLastEdited(note.updatedAt)

titleEle.addEventListener('change', () => {
    note.title = titleEle.value
    note.updatedAt = moment()
    dateEle.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyEle.addEventListener('change', () => {
    note.body = bodyEle.value
    note.updatedAt = moment()
    dateEle.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeEle.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find(c => c.id === noteId)

        if(!note)
            location.assign('/index.html')

        titleEle.value = note.title
        bodyEle.value = note.body
        dateEle.textContent = generateLastEdited(note.updatedAt)
    }
})