var documentHTML = document;
var password = documentHTML.getElementById("passwordData");
var toggler = documentHTML.getElementById("toggler");

//Login
var LogInBtn = documentHTML.getElementById("logIn");

var passwordData = documentHTML.getElementById("passwordData");
var emailData = documentHTML.getElementById("emailData");

var errorMsg = documentHTML.getElementById("error-msg");


/**********************************Local Storage******************************** */
var allUsersContainer = [];
var globalIndex = 0;

/************************************Hide/Show Password**************************************** */

function showHidePassword(password) {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    toggler.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    toggler.classList.replace("fa-eye-slash", "fa-eye");
    password.setAttribute("type", "password");
  }
}

if (password) {
  toggler.addEventListener("click", function () {
    showHidePassword(password);
  });
}

/****************************************Actions************************************ */

//logIn function
function logIn() {
  //var logInFlag=true;
  var logData = {
    logEmail: emailData.value,
    logPassword: passwordData.value,
  };

  if (matchUser(logData)) {
    // console.log("signIn Successfully");
    errorMsg.classList.add("d-none");
    // console.log("Hello" + " " + allUsersContainer[globalIndex].userUName);
    localStorage.setItem("user", allUsersContainer[globalIndex].userUName);
    
      Swal.fire({
        position: "center",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title: `Hello ${allUsersContainer[globalIndex].userUName}`,
        showConfirmButton: false,
        timer: 1500,
      });
    
      setTimeout(function(){
        window.location.href = "/LaGaleriaApp/dashBoard.html";
      },1500);

    //window.location.href = "dashBoard.html";
    //userPName.innerHTML=`<i class="fa-solid fa-user"></i>${allUsersContainer[globalIndex].userUName}`
    //logInFlag=true;
  } else {
    console.log("somthing Wrong...");
    errorMsg.classList.remove("d-none");
    errorMsg.innerHTML = "incorrect password/E-mail... Please Try Again";
    logInFlag=false
  }
  // if(logInFlag){
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: `Hello ${allUsersContainer[globalIndex].userUName}`,
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  // }
  //return logInFlag;
}

//LogOut
function logOut() {
  localStorage.removeItem("user");
  window.location.href = "/LaGaleriaApp/index.html";
}

//press enter to add a new user
function keyBoardLogIn(e){
  if (e.keyCode === 13) {
    logIn();
   }
}

/***************************************Local Storage***********************/
//get Data from local Storage
function getFromLocalStorage() {
  if (localStorage.getItem("allUsers") === null) {
    allUsersContainer = [];
    // location.reload();
    if (allUsersContainer.length === 0) {
      allUsersContainer = [];
      returnedData = allUsersContainer;
      // location.reload();
    }
  } else {
    returnedData = JSON.parse(localStorage.getItem("allUsers"));
  }
  return returnedData;
}

//Check if the login was from a user that have registered before
/*function matchUser(logData) {
    //new String('javascript').valueOf() == new String('javascript').valueOf()
    //new String(logData.logEmail).valueOf() == new String(allUsersContainer[i].userEmail).valueOf()
    //new String(logData.logPassword).valueOf() == new String(allUsersContainer[i].userPassword).valueOf()
  for (var i = 0; i < allUsersContainer.length; i++) {
    if (
      (new String(logData.logEmail).valueOf() == new String(allUsersContainer[i].userEmail).valueOf()) &&
      (new String(logData.logPassword).valueOf() == new String(allUsersContainer[i].userPassword).valueOf())
    ) {
      console.log("tamam", i);
      globalIndex = i;
      //localStorage.setItem("user", usersData[i].name);
      return true;
    } else {
        console.log(logData)
      console.log("3'lt");
      return false;
    }
  }
}*/

//Check if the login was from a user that have registered before
function matchUser(logData) {
  var matchFlag = true;
  for (var i = 0; i < allUsersContainer.length; i++) {
    if (
      (logData.logEmail == allUsersContainer[i].userEmail || logData.logEmail == allUsersContainer[i].userUName  ) &&
      logData.logPassword == allUsersContainer[i].userPassword
    ) {
      localStorage.setItem("user", allUsersContainer[i].name);
      matchFlag = true;
      console.log("tamam", i);
      globalIndex = i;
      break;
    } else {
      // console.log("3'lt");
      matchFlag = false;
    }
  }
  return matchFlag;
}

/********************************Event Listeners************************* */

// get All Data from LocalStorage on page Load
documentHTML.addEventListener("DOMContentLoaded", function () {
  //alert('hello');
  allUsersContainer = getFromLocalStorage();
});

//fire the keyBoardLogIn function when a specific key is Pressed Down
documentHTML.addEventListener("keydown", keyBoardLogIn);

//////////////////////////logIn Functionalities/////////////////////////

if (emailData) {
  emailData.addEventListener("input", function () {
    LogInBtn.classList.remove("disabled");
  });
}

if (LogInBtn) {
  LogInBtn.addEventListener("click", function () {
    logIn();
  });
}
