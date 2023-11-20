// 导入模块
// #region
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
// #endregion

// 配置moongose
// #region
// 创建mongoose连接
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/mainDB')

// 设置mongoose约束并创建mongoose模型
const userSchema = new mongoose.Schema({
    username: String,
    tbid: String,
    email: String,
    address: String,
    password: String,
    vip: String,
})

// 创建模型
const userModel = mongoose.model('users', userSchema)

// 设置mongoose连接错误回调
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
// #endregion

// 配置express基础设施
// #region
// 创建express应用
const app = express()

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
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// 设置express静态资源文件
app.use(express.static(__dirname + '/resources'))

// 为ejs配置模板目录
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './resources/ejs'))

// #endregion

// 配置路由
// #region
// 接收注册请求
app.post('/register', urlencodedParser, (req, res) => {
    userObject = req.body
    userModel.find({ username: userObject.username }, (err, data) => {
        if (data.length == 0) {
            userModel.create({
                username: userObject.username,
                password: userObject.password,
                tbid: userObject.tbid,
                email: userObject.email,
                address: userObject.address,
                vip: "0",
            })
            const message = "注册成功，正在跳转页面..."
            res.render('message', { message })
        }
        else {
            const message = "注册失败，该账号已经存在"
            res.render('message', { message })
            return;
        }
    })
})

// 接收登录请求
app.post('/login', urlencodedParser, (req, res) => {
    userObject = req.body
    userModel.find({ username: userObject.username }, (err, data) => {
        if (data.length == 0) {
            // res.redirect('/wrong.html')
            const message = "登录失败，账号错误"
            res.render('message', { message })
            return
        }
        else if (data[0].password != userObject.password) {
            const message = "登录失败，密码错误"
            res.render('message', { message })
            return
        }
        else {
            req.session.username = userObject.username
            const message = "登录成功，正在跳转页面..."
            res.render('message', { message })
            return
        }
    })
})

// 接受session请求,处理首页弹窗
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

// 接受更新vip请求
app.post('/postvip', jsonParser, (req, res) => {
    if (req.session.username) {
        userModel.find({ username: req.session.username }, (err, data) => {
            if (err) {
                console.log("vip update wrong - account not found")
                return
            } else {
                userModel.updateOne({ username: req.session.username }, { vip: req.body.vip }, (err, data) => {
                    if (err) {
                        console.log("vip status change wrong")
                        return
                    }
                    else {
                        console.log("vip status change successfully")
                        res.redirect('/getvip')
                    }
                })
            }
        })
    } else {
        res.redirect('/wrong.html')
        return
    }
})

// 接受vip页面提示请求
app.get('/getvip', (req, res) => {
    const message = "购买套餐成功，正在为您跳转页面..."
    res.render('message', { message })
})

// 404处理重定向
app.all('*', (req, res) => {
    res.redirect('/index.html')
})
// #endregion

// 开启监听服务
app.listen(80, () => {
    console.log('server run success')
})


