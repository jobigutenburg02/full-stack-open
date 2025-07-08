// const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json()) // to access incoming data using json-parser (when handling POST requests)
app.use(cors()) // for allowing frontend to connect with backend (to bypass same-origin-policy)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// Note: 
// 1. app.get() handles incoming HTTP GET requests
// 2. response.end() responds to the request without sending any data.

// handle homepage
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>') // server responds with 'Hello World' (in html format)
})

// handle HTTP GET requests for fetching all notes
app.get('/api/notes', (req, res) => {
  res.json(notes) // server stores notes in json format as response
})

// handle HTTP GET requests for fetching a note
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id // get id from URL (HTTP request)
  const note = notes.find(note => note.id === id) // find a note in 'notes' array by id
  if(note) res.json(note) // server returns the note as a json format, if exists
  else res.status(404).end() // server returns 404 Not Found, if note doesn't exist
})

// handle HTTP DELETE requests for deleting a note
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id) // modify 'notes' array to exclude the selected note so that the note doesn't exist
  res.status(204).end() // server returns 204 No Content
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) // Math.max() accepts individual nos. as parameter, not an array. hence the '...' syntax
    : 0
  return String(maxId + 1)
}

// handle HTTP POST requests for creating a note
app.post('/api/notes', (req, res) => {
  const body = req.body // access json data from incoming requests

  // note is empty
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false, // 'false' is the default value
    id: generateId(),
  }

  notes = notes.concat(note) // add note into 'notes' array

  console.log(note)
  res.json(note) // server sends the note as response
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)