const homeButton = document.querySelector('.header .home')

homeButton.addEventListener('click', function () {
  location.href = '/index.html'
})

const ImgList = []
const imgCount = 63
for (let i = 0; i < imgCount; i++) {
  ImgList.push(`images/showImg/${i + 1}.webp`)
}

const mainImg = document.querySelector('.floor_1 .show img')
const randomButton = document.querySelector('.floor_1 .button')

mainImg.src = ImgList[0]
let curNum = 0
let randomNum

randomButton.addEventListener('click', function () {
  mainImg.style.opacity = 0
  setTimeout(() => {
    do {
      randomNum = Math.floor(Math.random() * imgCount)
    } while (randomNum == curNum)
    mainImg.src = ImgList[randomNum]
    mainImg.style.opacity = 1
    curNum = randomNum
  }, 400);
})

const myButton = document.querySelector('.header .my')

myButton.addEventListener('click', function () {
  location.href = '/user.html'
})


const item1 = document.querySelector('.popup_btn .item1 input')
const item2 = document.querySelector('.popup_btn .item2 input')
const itembutton = document.querySelector('.popup_btn button')

function showPopup() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}
function hidePopup() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}
function updateButton() {
  if (item1.checked) {
    itembutton.style.backgroundColor = "#FEC8D8"
  }
  else {
    itembutton.style.backgroundColor = "#cccccc"
  }
}

item1.addEventListener('click', function () {
  updateButton()
})

itembutton.addEventListener('click', function () {
  if (item1.checked) {
    hidePopup()
  }
  else {
    alert("请先勾选完成阅读用户条款的选项")
  }
})

const httpRequest = new XMLHttpRequest()
httpRequest.open('GET', '/getsession', true)
httpRequest.send()
httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    const json = httpRequest.responseText;//获取到json字符串，还需解析
    if (json == "{}") {
      showPopup()
    }
    else {
      console.log(2)
      myButton.style.backgroundColor = "#FEC8D880"
      myButton.style.boxShadow = "0 0 10px #0f0f0f";
    }
  }
}

