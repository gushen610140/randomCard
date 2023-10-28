const http = require('http')
const fs = require('fs')
const path = require('path')

const mimes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'gif': 'image/gif',
    'mp4': 'vedio/mp4',
    'mp3': 'vedio/mpeg',
    'json': 'application/json',
    'svg': 'image/svg+xml'

}

const server = http.createServer((request, response) => {
    if (request.method !== 'GET') {
        response.statusCode = 405
        response.end('Error')
        return;
    }

    const { pathname } = new URL(request.url, 'http://127.0.0.1')
    const root = __dirname + '/resources'
    const filePath = root + pathname

    fs.readFile(filePath, (err, data) => {
        if (err) {
            switch (err.code) {
                case 'ENOENT':
                    response.statusCode = 404
                    response.end('404 Not Found')
                    break
                case 'EPERM':
                    response.statusCode = 403
                    response.end('Permission')
                    break;
                default:
                    response.statusCode = 500
                    response.end('UnkownError')
            }
            return;
        }
        const ext = path.extname(filePath).slice(1)
        const type = mimes[ext]
        if (type) {
            if (type === 'html')
                response.setHeader('content-type', type + ';charset=utf-8')
            else
                response.setHeader('content-type', type)
        }
        else {
            response.setHeader('content-type', 'application/octet-stream')
        }
        response.statusCode = 200
        response.end(data)
    })
})

server.listen(80, () => {
    console.log('server begin success')
})
