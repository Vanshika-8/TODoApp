let todos = []

const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoItemsList = document.querySelector('.todo-items')
const searchBar=document.getElementById('searchBar')


searchBar.addEventListener('keyup',function(e){
  const searchString=e.target.value.toLowerCase()
  const filteredTodos=todos.filter((item)=>{
    return item.name.toLowerCase().includes(searchString)
  })
renderTodos(filteredTodos)

})

searchBar.style.display='none'




function toggleList(listvalue){
  if(listvalue=='task'){
    searchBar.style.display='none'
    todoForm.style.display='block'
    todoItemsList.style.display='block'
  }else if(listvalue=='cycle'){
    todoItemsList.style.display='none'
    searchBar.style.display='block'
    todoForm.style.display='none'
    todoItemsList.style.display='block'
  }
  
}

const todoList=document.querySelector('.todoList')
todoList.addEventListener('click',function(e){
    console.log(e)
  toggleList('task')
  todoList.classList.add("active-color")
  searchList.classList.remove("active-color")
  searchList.classList.add("inactive-color")
})

const searchList=document.querySelector('.searchList')
  searchList.addEventListener('click',function(e){
    console.log(e)
    toggleList('cycle')
    searchList.classList.add("active-color")
    todoList.classList.remove("active-color")
    todoList.classList.remove("inactive-color")
  })


const totalTasks = document.querySelector(".total-tasks span")
const completedTasks = document.querySelector(".completed-tasks span")


const dataObject=new Date()
const showcurrentDay=dataObject.toLocaleString('default',{weekday:'long'})
document.getElementById('day').innerHTML=`${showcurrentDay},`
document.getElementById('date').innerHTML=dataObject.getDate()
document.getElementById('year').innerHTML=dataObject.toLocaleString('default',{ month:'long'})

console.log(`${showcurrentDay}  ${dataObject.getDate()}` )


function countTasks() {
totalTasks.textContent = todos.length
  const completedTasksArray = todos.filter((item) => item.completed)
  completedTasks.textContent = completedTasksArray.length
  
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

