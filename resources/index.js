const homeButton = document.querySelector('.header .home')

homeButton.addEventListener('click', function () {
  location.reload()
})

const ImgList = []
for (let i = 0; i < 4; i++) {
  ImgList.push(`images/showImg/${i + 1}.jpg`)
}

const mainImg = document.querySelector('.floor_1 .show img')
const randomButton = document.querySelector('.floor_1 .button')
mainImg.src = ImgList[0]

randomButton.addEventListener('click', function () {
  const curNum = parseInt(mainImg.getAttribute('src')[15]) - 1
  console.log(curNum);
  mainImg.style.opacity = 0
  setTimeout(() => {
    let randomNum = Math.floor(Math.random() * 4)
    if (randomNum == curNum) {
      randomNum = (randomNum + 1) % 4
    }
    mainImg.src = ImgList[randomNum]
    mainImg.style.opacity = 1
  }, 200);
})




