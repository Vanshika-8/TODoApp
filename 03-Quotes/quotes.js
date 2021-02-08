// class MyQuote{
//   constructor()


// }





const randomQuotes=document.getElementById('randomQuotes').addEventListener('click',renderQuotes)
window.addEventListener('load',(e)=>{
  renderQuotes()
})
let listWrapper =document.getElementById('list')
const randomAuthor=document.getElementById('randomAuthor').addEventListener('click',renderAuthor)
window.addEventListener('load',(e)=>{
  renderAuthor()
})
let authorWrapper=document.getElementById('authorlist')
const wisdomQuotes=document.querySelector("input[name=wisdom]")
// wisdomQuotes.addEventListener( 'change', function() {
//   if(this.checked) {
//      console.log('Checkbox is checked..') 
//      renderWisdom()
//   } else {
//     console.log('Checkbox is not checked..')   
//   }
// });
// let wisdomlist=document.getElementById('wisdomlist')

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
// window.onload=renderQuotes()


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


  const form = document.querySelector('#formId');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
   const inputChecked=document.querySelectorAll('input[type=checkbox]')
    console.log('Getting the checkboxs',inputChecked)
    const nodeToArray=Array.from(inputChecked)
    console.log('Convert nodelist to array',nodeToArray)
    const elementsChecked=nodeToArray.filter(check=> check.checked)
    console.log('elements checked',elementsChecked)
    const nameCheckBox=elementsChecked.map(item=>item.name)
    console.log('Returning name',nameCheckBox)
   const joinName= nameCheckBox.join('|')
    console.log(joinName,'joing name')
  // const renderWisdom = await wisdomQuote();
  //Fetching the data .
  let resp=await fetch(`https://api.quotable.io/quotes?tags=${joinName}`)
  resp=  await resp.json()
  console.log('rendering wisdom quotes',resp)
    });

~