function viewedPage(){
  let moreView = localStorage.getItem("viewMore");
  let message = JSON.parse(moreView);
  document.getElementById("message-id").innerHTML = message.id;
  document.getElementById("message-title").innerHTML = message.title;
  document.getElementById("message-body").innerHTML = message.body;
}

viewedPage()