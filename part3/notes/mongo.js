const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://johan:${password}@mern-cluster.9j65jzi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=MERN-cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  // validation rules for 'content' property
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

// modify schema so that we don't need '_id' and '__v' fields in this case
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema) // add collection to db

// const note = new Note({
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// fetch all notes from db
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

module.exports = Note