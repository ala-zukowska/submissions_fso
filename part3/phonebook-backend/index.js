require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/contact')

morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ' '
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))

let contacts = []

app.get('/', (req, res) => {
  res.send('Phonebook backend is running. Try /api/persons or /info');
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  const currentTime = new Date()

  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${currentTime}</p>
    `)

})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = contacts.find(contact => contact.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).end()
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } /* else if (contacts.find(contact => contact.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } */

  const person = new Person({
    name: body.name, 
    number: body.number
  })

  person.save().then(savedContact => {
    response.json(savedContact)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})