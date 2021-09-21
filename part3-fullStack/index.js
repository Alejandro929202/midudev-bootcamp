const http = require('http')


//creamos un servidor y le pasamos un parametro que es un callBack(funcion que se ejecuta cada vez que le llega una request) 
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log('Server running on port ${PORT}')
