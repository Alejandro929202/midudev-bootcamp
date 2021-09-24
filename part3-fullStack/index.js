//const { request } = require('express')
const express = require('express')
const app = express()
//const http = require('http')

let notes = [
    {
        "id": 1,
        "content": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit and Twitch",
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
/*const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})
*/

app.get('/', (request, response) =>{
    response.send('<h1>Hello Wordl</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    //si no encuentra notas devuelve un error 404
    if(notes) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    note = notes.filter(note => note.id != id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}')
})

