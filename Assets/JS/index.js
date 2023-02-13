
var documentHTML = document;
var password = documentHTML.getElementById("passwordData");
//var passwordSign = documentHTML.getElementById("passwordSData");
var toggler = documentHTML.getElementById("toggler");

// SignUp Form
var SignUpBtn = documentHTML.getElementById("SignUp");
var LogInBtn = documentHTML.getElementById("logIn");
var LogOutBtn = documentHTML.getElementById("LogOutBtn");

var emailAlert = documentHTML.getElementById("email-alert");
var emailSData = documentHTML.getElementById("emailSData");

var nameAlert = documentHTML.getElementById("name-alert");
var nameData = documentHTML.getElementById("nameData");

var unameAlert = documentHTML.getElementById("uname-alert");
var unameData = documentHTML.getElementById("usernameData");

var passwordSign = documentHTML.getElementById("passwordSData");
var passwordBar = documentHTML.getElementById("passwordBar");
var pStrength = documentHTML.getElementById("passwordS");

var errorMsg = documentHTML.getElementById("error-msg");

//LogIn Form
var passwordData = documentHTML.getElementById("passwordData");
var emailData = documentHTML.getElementById("emailData");

var strength = 0;

/***********************Local Storage******************************** */
var allUsersContainer = [];
var objectIndex = 0;
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

if (passwordSign) {
  toggler.addEventListener("click", function () {
    showHidePassword(passwordSign);
  });
}

/*******************************Validation********************************* */
//name Validation
function nameValidation() {
  //var regex= /^[A-Z][a-z]{3,15}$/;
  if (/^[A-Z]/.test(nameData.value)) {
    if (/[a-z]{3,15}$/.test(nameData.value)) {
      nameAlert.classList.add("d-none");
      nameData.classList.remove("is-invalid");
      nameData.classList.add("is-valid");
      //SignUpBtn.classList.remove('disabled')
      return true;
    } else {
      nameAlert.innerHTML = "should contain from 3 to 15 small letter ";
      nameData.classList.remove("is-valid");
      nameData.classList.add("is-invalid");
      nameAlert.classList.remove("d-none");
      return false;
    }
  } else {
    nameAlert.innerHTML = "should start with capital letter";
    nameAlert.classList.remove("d-none");
    nameData.classList.remove("is-valid");
    nameData.classList.add("is-invalid");
    return false;
  }
}

//email-validation
function emailValidation() {
  //var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (/^([\w-]+(?:\.[\w-]+)*)/i.test(emailSData.value)) {
    if (/@((?:[\w-]+\.)*\w[\w-]{0,66})/i.test(emailSData.value)) {
      if (/\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(emailSData.value) == true) {
        emailAlert.classList.add("d-none");
        emailSData.classList.remove("is-invalid");
        emailSData.classList.add("is-valid");
        //SignUpBtn.classList.remove('disabled')
        return true;
      } else {
        emailAlert.innerHTML = "Domain is Unacceptable";
        emailAlert.classList.remove("d-none");
        emailSData.classList.remove("is-valid");
        emailSData.classList.add("is-invalid");
        return false;
      }
    } else {
      emailAlert.innerHTML = "Domain Name is Unacceptable";
      emailAlert.classList.remove("d-none");
      emailSData.classList.remove("is-valid");
      emailSData.classList.add("is-invalid");
      return false;
    }
  } else {
    emailAlert.innerHTML = "username is unacceptable";
    emailAlert.classList.remove("d-none");
    emailSData.classList.remove("is-valid");
    emailSData.classList.add("is-invalid");
    return false;
  }
}

//username-validation 
function unameValidation() {
  var regex = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;

  if (regex.test(unameData.value)) {
    unameAlert.classList.add("d-none");
    unameData.classList.remove("is-invalid");
    unameData.classList.add("is-valid");
    //SignUpBtn.classList.remove('disabled')
    return true;
  } else {
    unameAlert.innerHTML = "invalid username";
    unameAlert.classList.remove("d-none");
    unameData.classList.remove("is-valid");
    unameData.classList.add("is-invalid");
    return false;
  }
}

//password validation
function passwordIStrength() {
  var capFlag = 0,
    smallFlag = 0,
    minFlag = 0,
    charFlag = 0,
    numberFlag = 0;

  if (passwordSign.value) {
    passwordBar.classList.remove("d-none");
    //console.log(passwordSign.value);

    //Checks that a password has a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 Special Character with no spaces.
    //var regex=/((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*[!,%,&,@,#,$,^,*,?,_,~]).{8,})\S$/;
    //If password contains uppercase characters
    if (/(?=\S*?[A-Z])/.test(passwordSign.value)) {
      strength += 1;
      capFlag = 1;
      // console.log('uno',strength);
    }
    //If password contains lowercase characters
    if (/(?=\S*?[a-z])/.test(passwordSign.value)) {
      strength += 1;
      smallFlag = 1;
      // console.log('dos',strength);
    }
    //If it has numbers
    if (/(?=\S*?[0-9])/.test(passwordSign.value)) {
      strength += 1;
      numberFlag = 1;
      // console.log('tres',strength);
      // console.log(strength);
    }
    //If it has one special character
    if (/(?=\S*[!,%,&,@,#,$,^,*,?,_,~])/.test(passwordSign.value)) {
      strength += 1;
      charFlag = 1;
      // console.log(strength);
      // console.log('quatro',strength);
    }
    //If password is greater than 8
    if (passwordSign.value.length > 8) {
      strength += 1;
      // console.log('cinco',strength);
      minFlag = 1;
    }

    //If password is less than 2 (two flags)
    if (strength < 2) {
      pStrength.classList.remove("progress-bar-warning");
      pStrength.classList.remove("progress-bar-success");
      pStrength.classList.add("progress-bar-danger");
      pStrength.style.width = 10 + "%";

      //If password is matching 3 (three flags)
    } else if (strength == 3) {
      pStrength.classList.remove("progress-bar-success");
      pStrength.classList.remove("progress-bar-danger");
      pStrength.classList.add("progress-bar-warning");
      pStrength.style = "width: 60%";

      //If password match ALL flags
    } else if (
      capFlag == 1 &&
      smallFlag == 1 &&
      minFlag == 1 &&
      charFlag == 1 &&
      numberFlag == 1
    ) {
      // console.log('matchAll')
      pStrength.classList.remove("progress-bar-warning");
      pStrength.classList.remove("progress-bar-danger");
      pStrength.classList.add("progress-bar-success");
      pStrength.style.width = 100 + "%";
      return true;
    }
  } else {
    passwordBar.classList.add("d-none");
    strength = 0;
    (capFlag = 0),
      (smallFlag = 0),
      (minFlag = 0),
      (charFlag = 0),
      (numberFlag = 0);
    return false;
  }
}

//total Validation check
function validationInput() {
  if (
    nameValidation() &&
    emailValidation() &&
    unameValidation() &&
    passwordIStrength()
  ) {
    // alertValid.classList.replace('d-block','d-none')
    SignUpBtn.classList.remove("disabled");
    return true;
  } else {
    SignUpBtn.classList.add("disabled");
    // alertValid.classList.replace('d-none','d-block')
    return false;
  }
}

/****************************Actions***************************************** */

//add newUSer
function addNewUser() {
  //alert("add User Clicked");
  var user = {
    userEmail: emailSData.value,
    userName: nameData.value,
    userUName: unameData.value,
    userPassword: passwordSign.value,
  };
  if (allUsersContainer.length === 0) {
    allUsersContainer.push(user);
    addToLocalStorage();
    //console.log(allUsersContainer);
    reset();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You've Signed Up Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    // for (var i = 0; i < allUsersContainer.length; i++) {
    //   if (allUsersContainer[i].userUName.includes(user.userUName)) {
    //     //console.log(user.userUName,"uname mawgod");
    //     uNameFlag = 1;
    //     unameData.classList.add("is-invalid");
    //     errorMsg.classList.remove("d-none");
    //     errorMsg.innerHTML = "username you've entered has been used";
    //     break;
    //   }
    //   if (allUsersContainer[i].userEmail === user.userEmail) {
    //     //console.log(user.userEmail,"email mawgod");
    //     emailFlag = 1;
    //     errorMsg.classList.remove("d-none");
    //     emailSData.classList.add("is-invalid");
    //     errorMsg.innerHTML = "Email you've entered has been used";
    //     break;
    //   } else {
    //   }
    // }

    // if (emailFlag === 0 && uNameFlag === 0) {
    //   console.log("tamam");
    //   allUsersContainer.push(user);
    //   console.log(allUsersContainer);
    //   errorMsg.classList.add("d-none");
    //   reset();
    // } else {
    //   console.log("no add");
    //   emailFlag = 0;
    //   uNameFlag = 0;
    // }

    if (searchOnEmail()) {
      if (searchOnUserName()) {
        console.log("tamam");
        allUsersContainer.push(user);
        addToLocalStorage();
        console.log(allUsersContainer);
        errorMsg.classList.add("d-none");
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You've Signed Up Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function(){
          window.location.href = "/LaGaleriaApp/index.html";
        },1500);
      }
    } else {
      console.log("no add");
    }
  }

}


//press enter to add a new user
function keyBoardSignUp(e){
  if (e.keyCode === 13) {
    if(validationInput()){
      addNewUser();
    }
    //alert('Enter Pressed');
  }
}

//reset the input data
function reset() {
  // alert('reset have clicked');
  emailSData.value = "";
  nameData.value = "";
  unameData.value = "";
  passwordSign.value = "";
  emailSData.classList.remove("is-valid");
  nameData.classList.remove("is-valid");
  unameData.classList.remove("is-valid");
  pStrength.classList.remove("progress-bar-success");
  passwordBar.classList.add("d-none");
}

//logIn
// function logIn() {
//   var logData = {
//     logEmail: emailData.value,
//     logPassword: passwordData.value,
//   };
//   if(matchUser(logData)){
//    console.log("signIn Successfully");
   
//    //console.log( 'Hello' + " " + allUsersContainer[globalIndex].userUName);
//    localStorage.setItem('user', allUsersContainer[globalIndex].userUName );
//    window.location.href='dashBoard.html';
//   }
     
//   else {
//       console.log("somthing Wrong...");
//     } 
// }

//LogOut {needs Update}
// function logOut() {
//   localStorage.removeItem('user');
//   window.location.href='/index.html';
// }

/***************************************Local Storage***********************/

//add to local Storage
function addToLocalStorage() {
  localStorage.setItem("allUsers", JSON.stringify(allUsersContainer));
}

//get Data from local Storage
function getFromLocalStorage() {
  if (localStorage.getItem("allUsers") === null ) {
      allUsersContainer = [];
    if (allUsersContainer.length === 0) {
      allUsersContainer = [];
      returnedData = allUsersContainer;
    }
  } else {
    returnedData = JSON.parse(localStorage.getItem("allUsers"));
  }
  return returnedData;
}

//clear local storage (for purpose usage)
function localStorageClear()
{
  localStorage.clear();
}

//validate userName
function searchOnUserName() {
   var uNameFlag=true;
  for (var i = 0; i < allUsersContainer.length; i++) {
    if (allUsersContainer[i].userUName === unameData.value) {
      //console.log(user.userUName,"uname mawgod");
      uNameFlag=false;
      unameData.classList.add("is-invalid");
      errorMsg.classList.remove("d-none");
      errorMsg.innerHTML = "username you've entered has been used";
      // return false;
      break;
    } else {
      // uNameFlag=true;
    }
    //return true;
  }
  return uNameFlag;
}

//validate email
function searchOnEmail() {
  var emailFlag=true;
  for (var i = 0; i < allUsersContainer.length; i++) {
    if (allUsersContainer[i].userEmail === emailSData.value) {
      //console.log(user.userEmail,"email mawgod");
      emailFlag = false;
      errorMsg.classList.remove("d-none");
      emailSData.classList.add("is-invalid");
      errorMsg.innerHTML = "Email you've entered has been used";
      //return false;
      break;
    } else {
    }
    //return true;
  }
  return emailFlag;
}

// function matchUser(logData) {
//   for (var i = 0; i < allUsersContainer.length; i++) {
//     if (
//       logData.logEmail === allUsersContainer[i].userEmail &&
//       logData.logPassword === allUsersContainer[i].userPassword
//     ) {
//       console.log("tamam",i);
//       globalIndex=i;
//       //localStorage.setItem("user", usersData[i].name);
//       return true;
//     } else {
//       console.log("3'lt");
//       return false;
//     }
//   }
// }
/********************************Event Listeners************************* */

// get All Data from LocalStorage on page Load
documentHTML.addEventListener("DOMContentLoaded", function () {
  //alert('hello');
  allUsersContainer = getFromLocalStorage();
});


//check Validation when body Updats
documentHTML.body.addEventListener("input", function () {
  validationInput();
});

if (emailSData) {
  emailSData.addEventListener("blur", function () {
    emailValidation();
  });
}

if (nameData) {
  nameData.addEventListener("blur", function () {
    nameValidation();
  });
}

if (unameData) {
  unameData.addEventListener("blur", function () {
    unameValidation();
  });
}

if (passwordSign) {
  passwordSign.addEventListener("blur", function () {
    passwordIStrength();
  });
}

if (SignUpBtn) {
  SignUpBtn.addEventListener("click", function () {
    addNewUser();
  });
}

//fire the keyBoardSign function when a specific key is Pressed Down
documentHTML.addEventListener("keydown", keyBoardSignUp);



//////////////////////////logIn/LogOut Functionalities/////////////////////////
// if(emailData){
//   emailData.addEventListener('blur',function(){
//     emailValidation();
//   })
// }

// if(emailData){
//   emailData.addEventListener('input',function(){
//     LogInBtn.classList.remove('disabled')
//   })
// }

// if (LogInBtn) {
//   LogInBtn.addEventListener("click", function () {
//     logIn();
//   });
// }

// LogOutBtn.addEventListener("click", function () {
//   logOut();
// });

/********************************************************* */
//  (function(){
//   var userFound = (localStorage.getItem('user'));
//   if(userFound){
//       // User is signed in
// window.replace('http://localhost:5501/dashBoard.html')
// //     /*window.location.href='/dashBoard.html';*/
//    }  
//   else {
//      // User is signed out
//      console.log('out')
// window.replace('http://localhost:5501/index.html')
// //    //window.location.href='/index.html'
//    }
//  })();
