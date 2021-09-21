const http = require('http')

let notes = [
    {
        "id": 1,
        "content": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "date": "2019-05-30t17:30:31.098Z",
        "important": "true"
      },
      {
        "id": 2,
        "content": "qui est esse",
        "date": "2019-05-30t17:30:31.098Z",
        "important": "false"
      },
      {
        "id": 3,
        "content": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "date": "2019-05-30t17:30:31.098Z",
        "important": "true"
      }
]

//creamos un servidor y le pasamos un parametro que es un callBack(funcion que se ejecuta cada vez que le llega una request) 
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log('Server running on port ${PORT}')
