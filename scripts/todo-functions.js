'use strict'

const getSavedTodos = () => {
    const todosJson = localStorage.getItem('todos')
    try {
        return todosJson ? JSON.parse(todosJson) : []
    } catch (error) {
        return []
    }
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const renderTodos = (todos, filters) => {
    const todoEle = document.querySelector('#todos')

    let filteredTodos = todos.filter(c => c.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    filteredTodos = filteredTodos.filter(c => !filters.hideCompleted || !c.completed)

    const incompleteTodos = filteredTodos.filter(c => !c.completed)

    todoEle.innerHTML = ""
    todoEle.appendChild(generateSummaryDOM(incompleteTodos))

    if(filteredTodos.length > 0){
        filteredTodos.forEach(todo => todoEle.appendChild(generateTodoDOM(todo)))
    } else {
        const messageEle = document.createElement('p')
        messageEle.classList.add('empty-message')
        messageEle.textContent = 'No todos to show'
        todoEle.appendChild(messageEle)
    }
    
}

const generateTodoDOM = (todo) => {
    const todoEle = document.createElement('label')
    const containerEle = document.createElement('div')
    const textEle = document.createElement('span')
    let checkboxEle = document.createElement("input")
    const buttonEle = document.createElement("button")

    // setup checkbox element
    checkboxEle.setAttribute("type", "checkbox")
    checkboxEle.checked = todo.completed
    containerEle.appendChild(checkboxEle)
    checkboxEle.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // setup text element
    textEle.textContent = todo.text.length ? todo.text : "Unnamed Todo"
    containerEle.appendChild(textEle)

    // setup container
    todoEle.classList.add('list-item')
    containerEle.classList.add('list-item__container')
    todoEle.appendChild(containerEle)
    
    // setup button element
    buttonEle.textContent = "remove"
    buttonEle.classList.add('button', 'button--text')
    todoEle.appendChild(buttonEle)
    buttonEle.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEle
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2")
    summary.classList.add('list-title')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`
    return summary
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(c => c.id === id)

    if (todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (id) => {
    const todo = todos.find(c => c.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
}