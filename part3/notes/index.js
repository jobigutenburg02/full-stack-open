require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

// middlewares
app.use(express.json()) // to access incoming data using json-parser (when handling POST requests)
app.use(cors()) // for allowing frontend to connect with backend (to bypass same-origin-policy)
app.use(express.static('dist')) // to make Express show static content, the page index.html and the JavaScript, etc., it fetches

// middleware for logging request header and body details
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// Note: 
// 1. app.get() handles incoming HTTP GET requests
// 2. response.end() responds to the request without sending any data.

// handle homepage
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>') // server responds with 'Hello World' (in html format)
})

// handle HTTP GET requests for fetching all notes
app.get('/api/notes', (req, res, next) => {
  Note.find({}).then(notes => {
    res.json(notes) // server sends notes in json format as response
  })
  .catch(error => next(error))
})

// handle HTTP GET requests for fetching a note
app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id // get id from URL (HTTP request)
  // const note = notes.find(note => note.id === id) // find a note in 'notes' array by id
  // if(note) res.json(note) 
  // else res.status(404).end()
  Note.findById(id)
  .then(note => {
    if(note) res.json(note) // server returns the note as a json format, if exists
    // else res.status(404).end() // server returns 404 Not Found, if note doesn't exist
  })
  .catch(error => next(error))
})

// handle HTTP DELETE requests for deleting a note
app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id // get id from URL (HTTP request)
  // notes = notes.filter(note => note.id !== id) // modify 'notes' array to exclude the selected note so that the note doesn't exist
  // res.status(204).end()
  Note.findByIdAndDelete(id)
  .then(result => {
    res.status(204).end() // server returns 204 No Content
  })
  .catch(error => next(error))
})

// handle HTTP PUT requests for updating a note
app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body // extract body data
  const id = req.params.id // get id from URL (HTTP request)

  Note.findById(id)
  .then(note => {
    // note doesn't exist
    if (!note) {
      return res.status(404).end()
    }
    
    // modify note data
    note.content = content
    note.important = important
    
    // updated note is saved to db
    return note.save()
    .then(updatedNote => {
      res.json(updatedNote) // server sends updated note as response
    })
  })
})

// handle HTTP POST requests for creating a note
app.post('/api/notes', (req, res, next) => {
  const body = req.body // access json data from incoming requests

  // // note is empty
  // if (!body.content) {
  //   return res.status(400).json({ 
  //     error: 'content missing' 
  //   })
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false, // 'false' is the default value
  })

  note.save()
  .then(savedNote => {
    res.json(savedNote) // server sends the note as response
  })
  .catch(error => next(error)) 
  // notes = notes.concat(note) // add note into 'notes' array
})

// middleware for handling unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// middleware for handling errors
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error) // middleware passes the error forward to the default Express error handler
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)