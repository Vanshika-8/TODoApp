/* 
    Multiline-comment.
    */
let isCheckBoxChecked = false
let isAuthorSelected = false
let limit = document.querySelector('#limit')
let nameInput= document.querySelector('#name')
let checkBoxes=document.getElementById('checkBoxs')
let listWrapper = document.getElementById('listWrapper')
const inputChecked = document.querySelectorAll('input[type=checkbox]')
const randomQuotes = document.getElementById('quotes__button').addEventListener('click', getRandomQuotes)
const randomAuthor = document.getElementById('author__button').addEventListener('click', getRandomAuthors)
window.addEventListener('load', (e) => {
  getQuotes()
})

function toggleList(listvalue){
  if(listvalue=='author'){
    checkBoxes.style.display='none';
    nameInput.style.display='block';
  }else if(listvalue=='quotes'){
    nameInput.style.display='none';
    checkBoxes.style.display='block';
  }
  
}

function clearingInputs(){
limit.value=''
nameInput.value=''
}


document.querySelector('#filters').addEventListener('change', function (e) {
  clearingInputs()
  if (e.target.value === 'author') {
    isAuthorSelected = true
    toggleList('author')
  }
  if (e.target.value === 'quotes') {
    isAuthorSelected = false
    toggleList('quotes')
  }
})

async function validateQuotes(isCheckBoxChecked, limit,nodeToArray) {
  if (limit.value.length <= 0 && !isCheckBoxChecked) {
    alert("Enter Limit and Checkbox is not checked")
    return
  }
  if (limit.value.length && isCheckBoxChecked) {
    let showingQuotes = await getQuotesByTagNames(nodeToArray,limit)
   return showingQuotes
   
  }
}



async function validateAuthor(limit,name) {
  if (limit.value.length <= 0 && name.value.length <= 0) {
    alert("Enter Limit and name")
  } if (limit.value.length && name.value.length) {
    let showingAuthor=await getAuthors(limit,name)
    return showingAuthor
  }
}


async function getQuotes() {
  try {
    const fetchData = await fetch('https://api.quotable.io/quotes');
    let res = await fetchData.json();
    return renderQuotes(res)
  } catch (error) {
    console.log(error);
  }
}

async function renderQuotes(data) {
  let listQuotes = '';
  listQuotes += data.results.map((results) => {
    return `<section class="quotes__card " >
       <span class="tags__displayed">${results.tags}</span>
        <div class="quotes__content-image">
        <img class="quotes__image" src="assets/quotes.png"
        <span class="quotes__content">${results.content}</span>
        </div>
        <span class="authors__displayed">${results.author}</span>
        </section>`;
  }).join('')

  listWrapper.innerHTML = listQuotes;
}

async function getRandomQuotes() {
  try {
    const fetchData = await fetch('https://api.quotable.io/random');
    let fetched = await fetchData.json();
    return renderRandomQuotes(fetched)
  } catch (error) {
    console.log(error);
  }
}


async function renderRandomQuotes(data) {
  let listQuotes = ` <div class="random__quotations">
        <img class="quotes__image" src="assets/quotes.png"
        <span>${data.content}</span>
        </div> `;


  listWrapper.innerHTML = listQuotes;
}


async function getRandomAuthors() {
  try {
    const fetchData = await fetch('https://api.quotable.io/random');
    let fetched = await fetchData.json();
    return renderRandomAuthors(fetched)
  } catch (error) {
    console.log(error);
  }
}


async function renderRandomAuthors(data) {
  let listQuotes = `<div class="random__authors" >
        <span class="authors__displayed">${data.author}</span>
        </div>`;


  listWrapper.innerHTML = listQuotes;
}



async function getQuotesByTagNames(nodeToArray,limit) {
  try {
    //Feching the quotes by the checkbox names with query params 
    const fetchDataByTags = await fetch(`https://api.quotable.io/quotes?tags=${nodeToArray}?limit=${limit}`);
    let resp = await fetchDataByTags.json();
    renderQuotesByTags(resp)
  } catch (error) {
    console.log(error);
  }
}

function renderQuotesByTags(data) {
  let listQuotesByTags = '';
  listQuotesByTags += data.results.map((results) => {
    return `<section class="quotes__card " >
       <span class="tags__displayed">${results.tags.join(' ')}</span>
        <div class="quotes__content-image">
        <img class="quotes__image" src="assets/quotes.png"
        <span class="quotes__content">${results.content}</span>
        </div>
        <span class="authors__displayed">${results.author}</span>
        </section>`;
  }).join('')


  listWrapper.innerHTML = listQuotesByTags;
}



async function getAuthors(limit,name) {
  try {
    //Filtering data with the query params which are passed in the function call//
    const fetchData = await fetch(`https://api.quotable.io/authors?limit=${limit}?name=${name}`)
    let response = await fetchData.json()
    renderAuthor(response)
  } catch (error) {
    console.log(error)
  }

}

function renderAuthor(data) {
  let listAuthor = ''
  listAuthor += data.results.map((results) => {
    return `<section class="author__card " >
       <span class="authorName__displayed">${results.name}</span>
        <div class="author__content-image">
        <img class="author__image" src="assets/info.png"
        <span class="author__bio">${results.bio}</span>
        </div>
        <div class="information__link">
        <img class="wiki__image" src="assets/wikipedia-logo.png">
        <a href="${results.link}" class="link__displayed">Bio Details</a>
        </div>
       
        </section>`;
  }).join('')


  listWrapper.innerHTML = listAuthor;

}



const form = document.querySelector('#formId');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //Array of checkboxes which will be filtered on basis of whether it's checked or not!
  const arrayChecked=Array.from(inputChecked).filter(check => check.checked)
  const nodeToArray = Array.from(inputChecked).filter(check => check.checked).map(item => item.name).join('|')
 //Condition for whether the array has checked values.
  isCheckBoxChecked = arrayChecked.length >0 ? true : false
  
  if (isAuthorSelected) {
    validateAuthor(limit,nameInput)
    return
  }
  if (!isAuthorSelected) {
    validateQuotes(isCheckBoxChecked,limit,nodeToArray)
    return 
  }
});