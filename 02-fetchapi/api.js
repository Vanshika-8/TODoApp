
let addPostActive=false
let userData=[]
let userSearchActive=false
let searchInputVisible=true
const form=document.querySelector('.addPost')
const searchBar = document.getElementById('search')
document.getElementById('getUser').addEventListener('click',getUser)
document.getElementById('getPost').addEventListener('click',getPost)
document.getElementById("addPost1").addEventListener('click',(e)=>{
    addPostActive=true
    toggleList('form')
    addPost(e)
})

if(addPostActive){
    document.querySelector('.addPost').addEventListener('submit',function(e){
        e.preventDefault()
        console.log(e) 
     addPost(e)
    })
}

const notification=document.querySelector('.notification')   


function toggleList(search){
   if((userSearchActive && searchInputVisible) || (!userSearchActive && searchInputVisible)){
    output.classList.add('messageVisible') 
    form.classList.add('messageInvisible')
    searchBar.classList.add('messageVisible')
   }
   if(addPostActive){
    output.classList.add('messageInvisible')
    form.classList.remove('messageVisible')
    searchBar.classList.add('messageInvisible')
   }
}




function renderUser(users){
 let usersList
    usersList =users.map((user)=> {return `<div class="user">
    <h3>User Id: ${user.id}</h3>
     <span class="userInfo">Name: ${user.name}</span>
     <span class="userInfo userName">User Name: ${user.username}</span>
     <span class="userInfo">Address: ${user.address.street},${user.address.city},${user.address.suite}</span>
     <span class="userInfo">Email: ${user.email}</span>
     <span class="userInfo">Contact: ${user.phone}</span>
     <span class="userInfo">Website-link: ${user.website}</span>
    </div>` }).join('')
  
    
    document.getElementById('output').innerHTML=usersList
}
function getUser(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((data)=>{
        userData=data
        userSearchActive=true
        searchInputVisible=true
        addPostActive=false
        toggleList('user')
   renderUser(data.filter(user=>!!user))
    })

}



function addPost(e){
    e.preventDefault()
    let title=document.getElementById('title').value;
     let body=document.getElementById('body').value;
     fetch('https://jsonplaceholder.typicode.com/posts',{
         method:'POST',
         headers:{
             'Accept':'application/json , text/plain , */*',
             'Content-type':'application/json'
         },
         body:JSON.stringify({title:title,body:body})
 
     }).then((res)=>res.json())
     .then((data)=> addNotification())
        removeNotification()
        
}

function removeNotification(){
    setTimeout(()=>{
        notification.classList.add('messageInvisible')
        notification.classList.remove('messageVisible')
        },3000)
         
}


function addNotification(){
    notification.classList.remove('messageInvisible')
    notification.classList.add('messageVisible')
}

function renderPosts(posts){
let postsList
postsList=posts.map((post)=>{
    return `<div>
    <h4>User Id:${post.id}</h4>
    <span class="userInfo">Title: ${post.title}</span>
    <span class='userInfo">Body:${post.body}</span>
    </div>`
}).join('')
document.getElementById('output').innerHTML=postsList
}



function getPost(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>res.json())
    .then((data)=>{
        userData=data
        userSearchActive=false
        searchInputVisible=true
        addPostActive=false
        toggleList('post')
        renderPosts(data.filter(post=>!!post))
    })
}


    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
       const filterData=userData.filter((data)=>{
           return userSearchActive ?   data.username.toLowerCase().includes(searchString) : data.title.toLowerCase().includes(searchString)
       })
    userSearchActive ? renderUser(filterData) : renderPosts(filterData)
     
    });


