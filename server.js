
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/resources'))

app.post('/post', urlencodedParser, (req, res) => {
    userObject = req.body
    res.send(userObject.username + ' ' + userObject.password)
})

app.all('*', (req, res) => {
    res.redirect('/index.html')
})

app.listen(80, () => {
    console.log('server run success')
})