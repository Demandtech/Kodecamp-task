//postWrapper
let outputContainer = document.querySelector(".output-container");
//postForm
let  inputForm = document.querySelector("#input-form");
//title
let  inputTitle = document.querySelector("#input-title");
//body
let inputBody = document.querySelector("#input-body");
//postBox
let outputBox =[]

let url =  "https://jsonplaceholder.typicode.com/posts/"

//Reuse Data
function Reused(arr){
       let outputHolder = "";
       arr.forEach((post) => {
           outputHolder += `
                    <div id="output">
                                <p>${post.id}</p>
                                <h5  id="message-title">${post.title}</h5>
                                <p id="message-body">${post.body}</p>
                                <div class="output-btn">
                                        <button class="edit" id="edit-button" onclick ="Update(${post.id})"><i class="fa-solid fa-pen"></i></i>Update</button>
                                        <button class="view"  id="view-button" onclick ="View(${post.id})"><i class="fa-solid fa-eye"></i>Read More</button>
                                        <button class="delete" id="delete-button" onclick ="Delete(${post.id})"><i class="fa-solid fa-trash"></i>Delete</button>
                                </div>
                        </div>
                  `;
       });

       outputContainer.innerHTML = outputHolder; 
}

//GET POSTS
function Get(){
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            outputBox = data
           Reused(outputBox); 
        })

}
Get()

//CREATE POST
function Create(e) {
    e.preventDefault();
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            title: inputTitle.value,
            body: inputBody.value,
            userId: 1,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            outputBox.unshift(data)
             Reused(outputBox);  
                  
        })     
 }
inputForm.addEventListener("submit", Create); 

//UPDATE
function Update(id){
  fetch(`${url}${id}`, {
      method: "PUT",
      body: JSON.stringify({
          id: id,
          title: inputTitle.value,
          body: inputBody.value,
          userId: 1,
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
      },
  })
      .then((response) => response.json())
      .then((data) => {
         let postTitles = document.querySelectorAll("#message-title");
          let postBodies = document.querySelectorAll("#message-body");

          postTitles.forEach((postTitle, index) => {
              if (index + 1 === id) {
                  if (data.title !== " ") {
                      postTitle.innerHTML = data.title;
                  }
              }
          });

          postBodies.forEach((postBodies, index) => {
              if (index + 1 === id) {
                  if (data.body !== " ") {
                      postBodies.innerHTML = data.body;
                  }
              }
          });
      });
   
    
}

//VIEW
function View(id){
        fetch( `${url}${id}`)
        .then((response) => response.json())
        .then((data) => {
        localStorage.setItem("viewMore", JSON.stringify(data))
        window.location.href =`morepage.html`
    });
  
}

//DELETE

function Delete(id){
     fetch(`${url}${id}`, {
         method: "DELETE",
     })
         .then((response) => response.json())
         .then((data) => {
             outputBox = outputBox.filter((post) => post.id !== id);
             Reused(outputBox);
         });
}





