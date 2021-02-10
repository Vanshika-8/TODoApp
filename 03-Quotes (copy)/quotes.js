let isCheckBoxChecked=false
function validateQuotes(){
 if(limit.value.length<=0 && !isCheckBoxChecked){
    alert("Enter Limit and Checkbox is not checked")
    }if( limit.value.length && isCheckBoxChecked){
      getQuotes(isCheckBoxChecked,limit)
      }
      }

function validateAuthor(){
  let limit=document.querySelector('#limit')
  let name=document.querySelector('#name')
 if(limit.value.length<=0 && name.value.length<=0){
    alert("Enter Limit and name")
}if( limit.value.length && name.value.length){
  getAuthors(limit,name)
  }
}


//const randomQuotes=document.getElementById('randomQuotes').addEventListener('click',getQuotes("random"))
window.addEventListener('load',(e)=>{
renderQuotes()
})
let listWrapper = document.getElementById('listWrapper')


async function getQuotes(isCheckBoxChecked,limit) {
  try {
      const fetchData = await fetch('https://api.quotable.io/quotes');
    return await fetchData.json();
     
  } catch (error) {
      console.log(error);
  }
  
  return await renderQuotes(fetchData)
}

async function renderQuotes(data) {
   data=await getQuotes()
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






async function getAuthors(limit,name){
  try{
    const fetchData=await fetch(`https://api.quotable.io/authors`)
    return await fetchData.json()
  }catch(error){
    console.log(error)
  }
  return await renderAuthor(fetchData)
}

async function renderAuthor(data){
data=await getAuthors()
let listAuthor=''
listAuthor=data.results.map((results)=>{
  return `<div>
  <span>${results.name}</span>
      <span>${results.bio}</span>
      <span>${results.link}</span>
  </div>`
}).join('')

listWrapper.innerHTML=listAuthor;

}




    const form = document.querySelector('#formId');
    form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputChecked=document.querySelectorAll('input[type=checkbox]')
    const nodeToArray=Array.from(inputChecked).filter(check=>check.checked).map(item=>item.name).join('|')
  isCheckBoxChecked=nodeToArray ? true : false 
   validateQuotes()
    validateAuthor()
   let resp=await fetch(`https://api.quotable.io/quotes?tags=${nodeToArray}`)
      resp=  await resp.json()
      console.log('rendering wisdom quotes',resp)
      let checkBoxList=''
      resp.results.forEach(results=>{
        checkBoxList+=`<div>
        <h1 class="tagName">${results.tags.join(' ')}</h1>
        <img src="quote.png"
     <span   class="content">${results.content}</span>
               
        <span class="authorName">${results.author}</span>
        </div>`
      })
     document.getElementById('listWrapper').innerHTML=checkBoxList
    
 
    });
    

  
