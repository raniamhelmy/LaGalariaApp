var documentHTML = document;

//LogOut
var LogOutBtn = documentHTML.getElementById("LogOutBtn");

var bottomBar = documentHTML.getElementById("bottomBar");

var LogOutBtnB = documentHTML.getElementById("LogOutBtnB");

/****************************************Actions************************************ */

function logOut() {
  localStorage.removeItem("user");

  Swal.fire({
    position: "center",
    icon: "success",
    title: "You've Logged Out Successfully",
    showConfirmButton: false,
    timer: 1000,
  });

  setTimeout(function () {
    window.location.href = "/LaGaleriaApp/index.html";
  }, 1000);
}

/****************************************Events************************************ */

LogOutBtn.addEventListener("click", function () {
  logOut();
});

LogOutBtnB.addEventListener("click", function () {
  logOut();
});

window.addEventListener("resize", function () {
  if (window.innerWidth < 575.9808) {
    bottomBar.classList.remove("d-none");
  } else {
    bottomBar.classList.add("d-none");
  }
});

/************************************************************************************* */
/**************************************Slider Part************************************ */
// select all elements
var imgs = Array.from(document.querySelectorAll(".slider__container img")); //nodelist
var fixedBox = document.getElementById("fixed-box");
var innerImg = document.getElementById("innerImg");
var closeBtn = document.getElementById("close-btn");
var leftBtn = document.getElementById("left-btn");
var rightBtn = document.getElementById("right-btn");

var currentIndex; //global
document.addEventListener("click", function (e) {
  // console.log(e.target)
  var clickedImg = e.target;
  currentIndex = imgs.indexOf(clickedImg);

  var imgSrc = clickedImg.getAttribute("src"); // null
  if (imgSrc != null) {
    fixedBox.classList.replace("d-none", "d-flex");
    innerImg.setAttribute("src", imgSrc);
  }
});

function closeBox() {
  fixedBox.classList.replace("d-flex", "d-none");
}

fixedBox.addEventListener("click", function () {
  closeBox();
});
closeBtn.addEventListener("click", function () {
  closeBox();
});

function prevImg() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imgs.length - 1;
  }

  var nextImg = imgs[currentIndex];
  console.log(currentIndex);
  var imgSrc = nextImg.getAttribute("src");
  innerImg.setAttribute("src", imgSrc);
}
leftBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  prevImg();
});

// nextImg
function nextImg() {
  currentIndex++;
  if (currentIndex == imgs.length) {
    currentIndex = 0;
  }

  var nextImg = imgs[currentIndex];
  console.log(currentIndex);
  var imgSrc = nextImg.getAttribute("src");
  innerImg.setAttribute("src", imgSrc);
}
rightBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  nextImg();
});

// next - prev keyboard
document.addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight") {
    nextImg();
  } else if (e.key == "ArrowLeft") {
    prevImg();
  } else if (e.key == "Escape") {
    closeBox();
  }
});

/************************************************************************************ */
