const randomQuotes=document.getElementById('randomQuotes').addEventListener('click',renderQuotes)
let listWrapper =document.getElementById('list')
const randomAuthor=document.getElementById('randomAuthor').addEventListener('click',renderAuthor)
let authorWrapper=document.getElementById('authorlist')
const wisdomQuotes=document.querySelector("input[name=wisdom]")
wisdomQuotes.addEventListener( 'change', function() {
  if(this.checked) {
     console.log('Checkbox is checked..') 
     renderWisdom()
  } else {
    console.log('Checkbox is not checked..')   
  }
});
let wisdomlist=document.getElementById('wisdomlist')

async function wisdomQuote(){
  try{
    let resp=await fetch('https://api.quotable.io/quotes?tags=wisdom')
    return await resp.json()
  }catch(error){
    console.log(error)
  }
}

async function renderWisdom() {
  const renderWisdom = await wisdomQuote();
  let wlist=''
   renderWisdom.results.forEach(results => {
      wlist+= `<div>
      <span>${results.tags}</span>
      <span>${results.content}</span>
      <span>${results.author}</span>
      </div>`;

     
  });

 
wisdomlist.innerHTML = wlist;
}


async function getQuotes() {
  let url = 'https://api.quotable.io/quotes';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderQuotes() {
  const renderQuotes = await getQuotes();
  let html = '';
  renderQuotes.results.forEach(results => {
      let htmlSegment = `<div>
      <span>${results.tags}</span>
      <span>${results.content}</span>
      <span>${results.author}</span>
      </div>`;

      html += htmlSegment;
  });

 
  listWrapper.innerHTML = html;
}



async function getAuthors(){
  try{
    let response=await fetch('https://api.quotable.io/authors')
    return await response.json()
  }catch(error){
    console.log(error)
  }
}

async function renderAuthor(){
const renderAuthor=await getAuthors()
let listAuthor=''
renderAuthor.results.forEach(results=>{
  listAuthor+=`<div>
  <span>${results.name}</span>
      <span>${results.bio}</span>
      <span>${results.link}</span>
  </div>`
})
authorWrapper.innerHTML=listAuthor
}


