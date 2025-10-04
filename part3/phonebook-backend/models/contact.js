const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log(`Connecting to ${url}`)

mongoose.connect(url)
    .then( result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log(`Error connecting to MongoDB: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required!'],
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        required: [true, 'The number is required!']
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Person', personSchema)