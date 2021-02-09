// function validateDropDown(){
//   document.querySelector('#filters').onclick=function(e){
//     if(e.target.value==='author'){
//       validateAuthor()
//     }else if(e.target.value==='quotes'){
//       renderQuotes()
//     }
//   }
// }


// function validateQuotes(){
//   if(limit.value.length<=0){
//     alert("Enter Limit")
//     limit.focus()
//     return false
// }

function validateAuthor(){
  let limit=document.querySelector('#limit')
  let name=document.querySelector('#name')
 if(limit.value.length<=0){
    alert("Enter Limit")
    limit.focus()
    return false
  }if(name.value.length<=0){
    alert("Enter Name")
    name.focus()
    return false
  }
  renderAuthor(limit,name)
  return false
}


const randomQuotes=document.getElementById('randomQuotes').addEventListener('click',renderQuotes("random"))
window.addEventListener('load',(e)=>{
  renderQuotes()
})
let listWrapper = document.getElementById('listWrapper')




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
  let listQuotes = '';
  renderQuotes.results.forEach(results => {
      let htmlSegment = `<div>
      <h1 class="tagName">${results.tags}</h1>
      <span class="content">${results.content}</span>
      <span class="authorName">${results.author}</span>
      </div>`;

      listQuotes += htmlSegment;
  });

  listWrapper.innerHTML = listQuotes;
}



async function getAuthors(){
  try{
    let response=await fetch(`https://api.quotable.io/authors`)
    return await response.json()
  }catch(error){
    console.log(error)
  }
}

async function renderAuthor(limit,name){
const renderAuthor=await getAuthors()
let listAuthor=''
renderAuthor.results.forEach(results=>{
  listAuthor+=`<div>
  <span>${results.name}</span>
      <span>${results.bio}</span>
      <span>${results.link}</span>
  </div>`
})

listWrapper.innerHTML=listAuthor;
}




    const form = document.querySelector('#formId');
   form.addEventListener('submit', async function(e) {
    e.preventDefault();
    validateAuthor()
    const inputChecked=document.querySelectorAll('input[type=checkbox]')
   const nodeToArray=Array.from(inputChecked).filter(check=>check.checked).map(item=>item.name).join('|')
      let resp=await fetch(`https://api.quotable.io/quotes?tags=${nodeToArray}`)
      resp=  await resp.json()
      console.log('rendering wisdom quotes',resp)
      let checkBoxList=''
      resp.results.forEach(results=>{
        checkBoxList+=`<div>
        <h1 class="tagName">${results.tags.join(' ')}</h1>
        var iEl = document.createElement('i');  
      iEl.style.className = "fa fa-quotes";  
      document.getElementByClassName("content").appendChild(iEl); 
        <span  id="icon" class="content">${results.content}</span>
               
        <span class="authorName">${results.author}</span>
        </div>`
      })
     document.getElementById('listWrapper').innerHTML=checkBoxList
    
 
    });
    


