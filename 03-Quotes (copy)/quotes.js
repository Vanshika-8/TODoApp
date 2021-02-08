// class MyQuote{
//   constructor()


// }


const randomQuotes=document.getElementById('randomQuotes').addEventListener('click',renderQuotes("random"))
window.addEventListener('load',(e)=>{
  renderQuotes()
})
let listWrapper = document.getElementById('listWrapper')

// const wisdomQuotes=document.querySelector("input[name=wisdom]")

// wisdomQuotes.addEventListener( 'click', function() {
//   if(this.checked) {
//     //  console.log('Checkbox is checked..') 
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

 
list.innerHTML = wlist;
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
  let listQuotes = '';
  renderQuotes.results.forEach(results => {
      let htmlSegment = `<div>
      <span>${results.tags}</span>
      <span>${results.content}</span>
      <span>${results.author}</span>
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

listWrapper.innerHTML=listAuthor;
}




    const form = document.querySelector('#formId');
   form.addEventListener('submit', async function(e) {
    e.preventDefault();
    renderAuthor()
    const inputChecked=document.querySelectorAll('input[type=checkbox]')
   const nodeToArray=Array.from(inputChecked).filter(check=>check.checked).map(item=>item.name).join('|')
      let resp=await fetch(`https://api.quotable.io/quotes?tags=${nodeToArray}`)
      resp=  await resp.json()
      console.log('rendering wisdom quotes',resp)
      let checkBoxList=''
      resp.results.forEach(results=>{
        checkBoxList+=`<div>
        <span>${results.tags.join(' ')}</span>
        <span>${results.content}</span>
        <span>${results.author}</span>
        </div>`
      })
     document.getElementById('listWrapper').innerHTML=checkBoxList
    
 
    });


  // document.querySelector("#filters").onchange = function (e){
  //   if(e.target.value==='author')
  //   {
  //     dropDown='author'
  //   }
  //   else if(e.target.value==='quotes'){
  //     dropDown='quotes'
  //   }
  //  }

//  function Validate(){
//    const dropDown=document.querySelector('#filters')
//    if(dropDown.value==='')
//    {
//      alert('Select something')
//      return false;
//    }else{
//      return true;
//    }
//  }