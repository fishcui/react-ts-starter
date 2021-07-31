let express = require('express')
const http = require('http')
// let app = express()

// app.get('/say', function(req, res) {
//     let { wd, callback } = req.query
//     console.log(wd)
//     console.log(callback)
//     res.end(`${callback}('我不爱你')`)
// })

// app.listen(3000)

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    const proxyRequest = http.request(
        {
            host: '127.0.0.1',
            port: 4000,
            url: '/',
            method: request.method,
            headers: request.headers
        },
        serverResponse => {
            // 第三步：收到服务器的响应
            var body = ''
            serverResponse.on('data', chunk => {
              body += chunk
            })
            serverResponse.on('end', () => {
              console.log('The data is ' + body)
              // 第四步：将响应结果转发给浏览器
              response.end(body)
            })
        }
    ).end()
})

server.listen(3000, () => {
    console.log('The proxyServer is running at http://localhost:3000')
})