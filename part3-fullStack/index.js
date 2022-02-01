//dependecia npm install dotenv para que utilice el archivo .env
require('dotenv').config()
//importar la conexion del fichero mongo.js
require('./mongo') 


const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const User = require('./models/user.js')
const userExtractor = require('./middleware/userExtractor.js')

//const http = require('http')

//Con esta linea decimos que App soporte las request cuando se le pase un objeto y lo
// parsea el request.body para 
app.use(express.json())

//CORS middleware que permite decir a nuestra API de que origenes permitimos acceder
app.use(cors())

//app.use(logger)


// let notes = []

//creamos un servidor y le pasamos un parametro que es un callBack(funcion que se ejecuta cada vez que le llega una request) 
/*const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})
*/

app.get('/', (request, response) =>{
    response.send('<h1>Hello Wordl</h1>')
})

app.get('/api/notes', async (request, response) => {
    const notes = await Note.find({})
        response.json(notes)
})


app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    
    Note.findById(id).then(note => {
        //si no encuentra notas devuelve un error 404
        if(note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.put('/api/notes/:id', userExtractor, (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }
    
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
    .then(result => {
        response.json(result)
    })
    .catch(err => next(err))
    
})

app.delete('/api/notes/:id', userExtractor, async (request, response, next) => {
    const { id } = request.params
    await Note.findByIdAndDelete(id)
    response.status(204).end()
   
})


app.post('/api/notes',userExtractor, async (request, response, next) => {
  console.log("entro a post")
    const {
    content,
    important = false
  } = request.body

  //sacar userId de request
  const {userId} = request


  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  // newNote.save().then(savedNote => {
  //   response.json(savedNote)
  // }).catch(err => next(err))

  try {
    const savedNote = await newNote.save()
    
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
  } catch (error) {
    response.status(400).send(error)
  }
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//middleware control de errores next
app.use(notFound)
app.use(handleErrors)

// app.post('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id != id)
//     response.status(204).end()
// })

// app.use((request, response) => {
//     response.status(404).json({
//         error: 'Not found'
//     })
// })


const PORT = process.env.PORT 

const server = app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}')
})

module.exports = {app, server}

