let listWrapper = document.getElementById('listWrapper')
const inputChecked = document.querySelectorAll('input[type=checkbox]')
const nodeToArray = Array.from(inputChecked).filter(check => check.checked).map(item => item.name).join('|')
console.log(nodeToArray)
console.log('node', nodeToArray)
window.addEventListener('load', (e) => {
  getQuotes()
})


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
    return `<section class="quotes__card">
       <span class="tags__displayed">${results.tags}</span>
        <div class="quotes__content&image">
        <img class="quotes__image" src="assets/quotes.png"
        <span class="quotes__content">${results.content}</span>
        </div>
        <span class="authors__displayed">${results.author}</span>
        </section>`;
  }).join('')

  listWrapper.innerHTML = listQuotes;
}


async function getQuotesByTagNames() {

  try {
    const fetchDataByTags = await fetch('https://api.quotable.io/quotes?tags=${nodeToArray}');
    let resp = await fetchDataByTags.json();
    return renderQuotesByTags(resp)
  } catch (error) {
    console.log(error);
  }
}

async function renderQuotesByTags(data) {
  let listQuotesByTags = '';
  listQuotesByTags += data.results.map((results) => {
    return `<div>
        <h1 >${results.tags.join(' ')}</h1>
        <img src="quote.png"
        <span >${results.content}</span>
        <span>${results.author}</span>
        </div>`;
  }).join('')

  listWrapper.innerHTML = listQuotesByTags;
}



const form = document.querySelector('#formId');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  getQuotesByTagNames()

});