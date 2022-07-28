const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const fileURL = document.querySelector("#fileURL");

const url = document.querySelector('#url');

const toast = document.querySelector(".toast");

const uploadURL = "http://localhost:4000/api/files/";


const maxAllowedSize = 100 * 1024 * 1024; //100mb


browseBtn.addEventListener("click", () => {
  fileInput.click();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  //   console.log("dropped", e.dataTransfer.files[0].name);
  const files = e.dataTransfer.files;
  if (files.length === 1) {
    if (files[0].size < maxAllowedSize) {
      fileInput.files = files;
      uploadFile();
    } else {
      showToast("Max file size is 100MB");
    }
  } else if (files.length > 1) {
    showToast("You can't upload multiple files");
  }
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragged");

  // console.log("dropping file");
});

dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");

  console.log("drag ended");
});

// file input change and uploader
fileInput.addEventListener("change", () => {
  if (fileInput.files[0].size > maxAllowedSize) {
    showToast("Max file size is 100MB");
    fileInput.value = ""; // reset the input
    return;
  }
  uploadFile();
});

// sharing container listenrs
copyURLBtn.addEventListener("click", () => {
  fileURL.select();
  document.execCommand("copy");
  showToast("Copied to clipboard");
});

fileURL.addEventListener("click", () => {
  fileURL.select();
});


const uploadFile = ()=>
{
  const file = fileInput.files[0];

  const formdata = new  FormData();

  formdata.append("myfile",file);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange=()=>{
   if(xhr.readyState === XMLHttpRequest.DONE)
   {
   const obj = JSON.parse(xhr.response);
   
   console.log(obj.file)
   // Create anchor element.
   var a = document.createElement('a'); 
                  
   // Create the text node for anchor element.
   var link = document.createTextNode("Genrated Link");
     
   // Append the text node to anchor element.
   a.appendChild(link); 
     
   // Set the title.
   a.title = "Link"; 
     
   // Set the href property.
   a.href = obj.file;
   a.setAttribute(
    'style',
    ` text-decoration:none;
    background-color: #f1f1f1;
    color: black;
    font-size: 16px;
    padding: 16px 30px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;`
    
  );
   url.append(a);
   
   }
  };

  xhr.open("POST",uploadURL);

  xhr.send(formdata);

}


