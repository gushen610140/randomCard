// 导入模块
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

// 创建express应用
const app = express()

// 创建mongoose连接
mongoose.connect('mongodb://127.0.0.1:27017/mainDB')

// 设置mongoose约束并创建mongoose模型
const userSchema = new mongoose.Schema({
    username: String,
    tbid: String,
    password: String
})
const userModel = mongoose.model('users', userSchema)

// 设置mongoose回调
mongoose.connection.once('open', () => {
    console.log('mongodb open')
})
mongoose.connection.once('error', () => {
    console.log('mongodb error')
})
mongoose.connection.once('close', () => {
    console.log('mongodb close')
})

// 为获得post请求体设置中间件
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

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
                tbid: userObject.tbid
            })
            res.redirect('/success.html')
        }
        else {
            res.redirect('/wrong.html')
            return;
        }
    })
})

// 接收注册登录请求
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
            res.redirect('/success.html')
            return;
        }
    })
})

// 404处理重定向
app.all('*', (req, res) => {
    res.redirect('/index.html')
})

// 开启监听服务
app.listen(80, () => {
    console.log('server run success')
})