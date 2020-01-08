'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: "",
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector("#txtSearch").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#add-todo-form').addEventListener("submit", (e) => {
    e.preventDefault()
    const todoText = e.target.elements.todoText.value.trim()

    if(todoText.length > 0){
        todos.push({
            id: uuidv4(),
            text: todoText,
            completed: false
        })
        saveTodos(todos)
    }
    
    e.target.elements.todoText.value = ""
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})