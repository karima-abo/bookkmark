var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var massage=document.getElementById("massage");
var searchInput=document.getElementById("search");
var lightContainer=document.querySelector(".light-contianer");
var websites=[];

if(localStorage.getItem("sites") !==null){
websites= JSON.parse(localStorage.getItem("sites"));
  displayData();
}

lightContainer.addEventListener("click",function(e){
  if(e.target === lightContainer){
    closeModel();
  }
})

document.addEventListener("keyup",function(e){

  if(!lightContainer.classList.contains("d-none")){

    if(e.key ==="Escape"){
      closeModel();
    }
  }
 
})

function addWebsit(){

 if(validation(bookmarkNameInput)
   && validation(bookmarkUrlInput)
  )
  {
  var website ={
    name: bookmarkNameInput.value ,
 
    websiturl : bookmarkUrlInput.value,
  };
  websites.push(website);
  localStorage.setItem("sites",JSON.stringify(websites));
  displayData();
  clearForm();
 }


 else{
 lightContainer.classList.remove("d-none");
 }

  

}


 function displayData(){
  var cartona="";
  for(var i=0 ; i<websites.length ; i++){
    cartona+= createHtmlrows(i);


     
  
 }
 document.getElementById("data").innerHTML=cartona;

}
function clearForm(){
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-valid");
}

function deleteWebsite(index){
websites.splice(index,1);
localStorage.setItem("sites",JSON.stringify(websites));
displayData();
}


function search(){
  var term = searchInput.value;
  var cartona="";
  for(var i=0 ; i< websites.length ; i++){
   if(websites[i].name.toLowerCase().includes(term.toLowerCase())){
     cartona += createHtmlrows(i);
 
    
  
 }
 document.getElementById("data").innerHTML=cartona;
   
  }
 }
 


 function createHtmlrows(i){
  var regex = new RegExp(searchInput.value ,'gi');
  return `
  
    <tr>
         <td>
           ${i +1}
         </td>
         <td>
           ${websites[i].name.replace(        regex     ,      (match)=>`<span class="bg-info" >${match}</span>`)}
           

         </td>
         <td>


          <button onclick="newWindoe( '${websites[i].websiturl}' )"  class="btn btn-grren"> 
         <i class="fa-solid fa-eye pe-2"></i>Visite
         </button>
       
        
         </td>
         <td>
          <button onclick="deleteWebsite(${i})" class="btn btn-danger">
           <i class="fa-solid fa-trash-can"></i>
          Delete</button>
         </td>
       </tr>

  `
}


function validation(element){
  var regex ={
    bookmarkName: /^\w{3,}(\s+\w+)*$/,
    bookmarkUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    
  }
  var text=element.value;
  if(regex[element.id].test(text)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;


  }
  else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function closeModel(){
  lightContainer.classList.add("d-none");
}

function newWindoe(url){
  window.open(url,"_blank");
  
}





