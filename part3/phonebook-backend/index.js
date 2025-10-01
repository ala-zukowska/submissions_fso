const express = require('express')
const morgan = require('morgan')

morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ' '
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
  res.send('Phonebook backend is running. Try /api/persons or /info');
});

app.get('/api/persons', (request, response) => {
    response.json(contacts)
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
  const id = request.params.id
  const person = contacts.find(contact => contact.id === id)

  if (person) {
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
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
  } else if (contacts.find(contact => contact.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    "id": String(Math.floor(Math.random() * 1000000000)),
    "name": body.name, 
    "number": body.number
  }

  contacts = contacts.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})