let todos = []

const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')



todoForm.addEventListener('submit', function(e) {
  e.preventDefault()
  addTodos(todoInput.value)
})

function addTodos(item) {

  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    
    todos.push(todo)
    addStorage(todos)
    todoInput.value = ''
  }
}


function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null
    const li = document.createElement('li')
    li.setAttribute('class', 'item')
     li.setAttribute('data-key', item.id)
     if (item.completed === true) {
      li.classList.add('checked')
    }
   li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `
    todoItemsList.append(li)
  });

}


function addStorage(todos) {
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos(todos)
}

function getStorage() {
  const reference = localStorage.getItem('todos')
  if (reference) {
    todos = JSON.parse(reference)
    renderTodos(todos)
  }
}


function toggle(id) {
  todos.find(function(item) {
   if (item.id == id) {
     item.completed = !item.completed
    }
  })
addStorage(todos)
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
     return item.id != id
  });
  addStorage(todos)
}

getStorage()
todoItemsList.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
    toggle(e.target.parentElement.getAttribute('data-key'))
  }
 if (e.target.classList.contains('delete-button')) {
   deleteTodo(e.target.parentElement.getAttribute('data-key'))
  }
})