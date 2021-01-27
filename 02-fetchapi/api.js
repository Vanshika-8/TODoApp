
/**
 * Pointers
 *Name your variables properly
 *the DOM elements which are reusable and we are using it multiple times declare and initialize them at the top
 * check the add and remove classlist how its done
 * practice your javascript array functions 
 */
let addPostActive = false
let userData = []
let userSearchActive = false
let searchInputVisible = true
const searchBar = document.getElementById('search')
const fetchUserButton = document.getElementById('getUser')
const fetchPostButton = document.getElementById('getPost')
const addPostButton = document.getElementById('addPost1')
const notification = document.querySelector('.notification')
const postForm =document.querySelector('.addPostForm');
let postAndUsersWrapper =document.getElementById('output')
fetchUserButton.addEventListener('click', getUser)
fetchPostButton.addEventListener('click', getPost)
addPostButton.addEventListener('click', (e) => {
    e.preventDefault()
    addPostActive = true
    toggleList()
})

postForm.addEventListener('submit', function (e) {
    e.preventDefault()
    addPost(e)
})

function toggleList() {
    if ((userSearchActive && searchInputVisible) || (!userSearchActive && searchInputVisible)) {
        output.classList.remove('messageInvisible')
        output.classList.add('messageVisible')
        searchBar.classList.remove('messageInvisible')
        searchBar.classList.add('messageVisible')
        postForm.classList.add('messageInvisible')
    }
    if (addPostActive) {
        output.classList.remove('messageVisible')
        output.classList.add('messageInvisible')
        searchBar.classList.add('messageInvisible')
        postForm.classList.remove('messageInvisible')
        postForm.classList.add('messageVisible')
    }
}
function renderUser(users) {
    let usersList
    usersList = users.map((user) => {
        return `<div class="user">
    <h3>User Id: ${user.id}</h3>
     <span class="userInfo">Name: ${user.name}</span>
     <span class="userInfo userName">User Name: ${user.username}</span>
     <span class="userInfo">Address: ${user.address.street},${user.address.city},${user.address.suite}</span>
     <span class="userInfo">Email: ${user.email}</span>
     <span class="userInfo">Contact: ${user.phone}</span>
     <span class="userInfo">Website-link: ${user.website}</span>
    </div>` }).join('')


    postAndUsersWrapper.innerHTML = usersList
}
function getUser() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            userData = data
            userSearchActive = true
            searchInputVisible = true
            addPostActive = false
            toggleList()
            renderUser(data.filter(user => !!user))
        })

}
function addPost(e) {
    e.preventDefault()
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json , text/plain , */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title: title, body: body })

    }).then((res) => res.json())
    .then((data) => {addNotification();removeNotification();})
}

function removeNotification() {
    setTimeout(() => {
        notification.classList.add('messageInvisible')
        notification.classList.remove('messageVisible')
    }, 3000)
}
function addNotification() {
    notification.classList.remove('messageInvisible')
    notification.classList.add('messageVisible')
}

function renderPosts(posts) {
    let postsList
    postsList = posts.map((post) => {
        return `<div>
    <h4>User Id:${post.id}</h4>
    <span class="userInfo">Title: ${post.title}</span>
    <span class='userInfo">Body:${post.body}</span>
    </div>`
    }).join('')
    postAndUsersWrapper.innerHTML = postsList
}
function getPost() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            userData = data
            userSearchActive = false
            searchInputVisible = true
            addPostActive = false
            toggleList()
            renderPosts(data.filter(post => !!post))
        })
}
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filterData = userData.filter((data) => {
        return userSearchActive ? data.username.toLowerCase().includes(searchString) : data.title.toLowerCase().includes(searchString)
    })
    userSearchActive ? renderUser(filterData) : renderPosts(filterData)
});


