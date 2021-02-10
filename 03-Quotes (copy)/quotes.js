let listWrapper = document.getElementById('listWrapper')
const inputChecked=document.querySelectorAll('input[type=checkbox]')
const nodeToArray=Array.from(inputChecked).filter(check=>check.checked).map(item=>item.name).join('|')
console.log(nodeToArray)
console.log('node',nodeToArray)
  window.addEventListener('load',(e)=>{
  getQuotes()
  })


  async function getQuotes() {
    try {
        const fetchData = await fetch('https://api.quotable.io/quotes');
      let res=await fetchData.json();
       return renderQuotes(res)
        } catch (error) {
        console.log(error);
    } 
  }
  
  async function renderQuotes(data) {
    let listQuotes = '';
   listQuotes+=data.results.map((results) => {
        return `<div>
        <h1 class="tagName">${results.tags}</h1>
        <img src="quote.png"
        <span class="content">${results.content}</span>
        <span class="authorName">${results.author}</span>
        </div>`;
  }).join('')
  
    listWrapper.innerHTML = listQuotes;
  }
  

  async function getQuotesByTagNames() {
   
    try {
     
        const fetchDataByTags = await fetch('https://api.quotable.io/quotes?tags=${nodeToArray}');
      let resp=await fetchDataByTags.json();
       return renderQuotesByTags(resp)
        } catch (error) {
        console.log(error);
    } 
  }

  async function renderQuotesByTags(data) {
    let listQuotesByTags = '';
   listQuotesByTags+=data.results.map((results) => {
        return `<div>
        <h1 class="tagName">${results.tags.join(' ')}</h1>
        <img src="quote.png"
        <span class="content">${results.content}</span>
        <span class="authorName">${results.author}</span>
        </div>`;
  }).join('')
  
    listWrapper.innerHTML = listQuotesByTags;
  }



  const form = document.querySelector('#formId');
  form.addEventListener('submit', function(e) {
  e.preventDefault();
  getQuotesByTagNames()

  });