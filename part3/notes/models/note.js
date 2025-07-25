const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// connect to db
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// create schema for 'note' collection
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

module.exports = mongoose.model('Note', noteSchema)