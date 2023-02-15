
var documentHTML = document;

function checkOnUserLogIn(){
    if (localStorage.getItem("user") === null ) {
      
        window.location.href = "./index.html";
  }
  else{
        //window.location.href = "./dashBoard.html";
  }
  }

// Check if the user is already logged In to show his Home Page
documentHTML.addEventListener("DOMContentLoaded", function () {
  checkOnUserLogIn()
});

if(localStorage.getItem("user")){
  documentHTML.removeEventListener("DOMContentLoaded", function () {
  checkOnUserLogIn()
});
}