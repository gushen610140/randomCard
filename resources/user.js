const homeButton = document.querySelector('.header .home')

homeButton.addEventListener('click', function () {
    location.href = '/index.html'
})

const myButton = document.querySelector('.header .my')

myButton.addEventListener('click', function () {
    location.href = '/user.html'
})

const login = document.querySelector('.floor_1 .container .title .login')
const register = document.querySelector('.floor_1 .container .title .register')
const form_1 = document.querySelector('.floor_1 .container .form_1')
const form_2 = document.querySelector('.floor_1 .container .form_2')

login.classList.add('select-login-register')

register.addEventListener('click', function () {
    login.classList.remove('select-login-register')
    register.classList.add('select-login-register')
    form_1.classList.add('showdown')
    form_2.classList.remove('showdown')
})

login.addEventListener('click', function () {
    register.classList.remove('select-login-register')
    login.classList.add('select-login-register')
    form_2.classList.add('showdown')
    form_1.classList.remove('showdown')
})




