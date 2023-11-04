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



