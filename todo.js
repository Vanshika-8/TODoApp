let todos = []

const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')


const totalTasks = document.querySelector(".total-tasks span")
const completedTasks = document.querySelector(".completed-tasks span")
// const remainingTasks = document.querySelector(".remaining-tasks span")


const currentDay=new Date()
const showcurrentDay=currentDay.toLocaleString('default',{weekday:'long'})
document.getElementById('day').innerHTML=showcurrentDay

const currentDate=new Date()
document.getElementById('date').innerHTML=currentDate.getDate()

 const currentYear=new Date()
 document.getElementById('year').innerHTML=currentYear.getFullYear()


function countTasks() {
totalTasks.textContent = todos.length
  const completedTasksArray = todos.filter((item) => item.completed)
  completedTasks.textContent = completedTasksArray.length
  // remainingTasks.textContent = todos.length - completedTasksArray.length
}


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
     if (item.completed) {
      li.classList.add('checked')
    }
   li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `
    todoItemsList.append(li)
    countTasks()
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
  countTasks()
}

getStorage()
countTasks()
todoItemsList.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
    toggle(e.target.parentElement.getAttribute('data-key'))
    
  }
 if (e.target.classList.contains('delete-button')) {
   deleteTodo(e.target.parentElement.getAttribute('data-key'))
  
  }
  
})

