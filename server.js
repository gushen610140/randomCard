// 导入模块
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
mongoose.set('strictQuery', true)

// 创建express应用
const app = express()

// 创建mongoose连接
mongoose.connect('mongodb://127.0.0.1:27017/mainDB')

// 设置mongoose约束并创建mongoose模型
const userSchema = new mongoose.Schema({
    username: String,
    tbid: String,
    email: String,
    address: String,
    password: String
})
const userModel = mongoose.model('users', userSchema)

// 设置mongoose回调
// #region
mongoose.connection.once('open', () => {
    console.log('mongodb open')
})
mongoose.connection.once('error', () => {
    console.log('mongodb error')
})
mongoose.connection.once('close', () => {
    console.log('mongodb close')
})
// #endregion

// 为获得post请求体设置中间件
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// 为session设置中间件
app.use(session({
    name: 'sid',
    secret: 'random',
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/userSession'
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 300
    }
}))

// 设置express静态资源文件
app.use(express.static(__dirname + '/resources'))

// 接收注册请求
app.post('/post/register', urlencodedParser, (req, res) => {
    userObject = req.body
    userModel.find({ username: userObject.username }, (err, data) => {
        if (data.length == 0) {
            userModel.create({
                username: userObject.username,
                password: userObject.password,
                tbid: userObject.tbid,
                email: userObject.email,
                address: userObject.address
            })
            res.redirect('/success.html')
        }
        else {
            res.redirect('/wrong.html')
            return;
        }
    })
})

// 接收登录请求
app.post('/post/login', urlencodedParser, (req, res) => {
    userObject = req.body
    userModel.find({ username: userObject.username }, (err, data) => {
        if (data.length == 0) {
            res.redirect('/wrong.html')
            return;
        }
        else if (data[0].password != userObject.password) {
            res.redirect('/wrong.html')
            return;
        }
        else {
            req.session.username = userObject.username
            res.redirect('/success.html')
            return;
        }
    })
})

// 接受session请求
app.get('/getsession', urlencodedParser, (req, res) => {
    if (req.session.username) {
        res.json({
            username: req.session.username
        })
    }
    else {
        res.json({})
    }
})

// 404处理重定向
app.all('*', (req, res) => {
    res.redirect('/index.html')
})

// 开启监听服务
app.listen(80, () => {
    console.log('server run success')
})

let a = 1
module.exports = {
    a: a
}
