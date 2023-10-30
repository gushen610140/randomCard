// 导入模块
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 创建express应用
const app = express()

// 创建mongoose连接
mongoose.connect('mongodb://127.0.0.1:27017/mainDB')

// 设置mongoose回调
mongoose.connection.once('open', () => {
    console.log('mongodb open')
    // 设置mongoose约束并创建mongoose模型
    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    })
    const userModel = mongoose.model('users', userSchema)
    // 查找数据
    userModel.find((err, data) => {
        if (!err) {
            console.log(data)
        }
    })
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

// 接收post请求
app.post('/post', urlencodedParser, (req, res) => {
    userObject = req.body
    res.send(userObject.username + ' ' + userObject.password)
})

// 404处理重定向
app.all('*', (req, res) => {
    res.redirect('/index.html')
})

// 开启监听服务
app.listen(80, () => {
    console.log('server run success')
})