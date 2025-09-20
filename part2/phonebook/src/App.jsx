import { useState, useEffect } from 'react'
import AllNumbersDisplay from './components/AllNumbersDisplay'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  },[])

  const changeNumber = (id, changedNumber) => {
    const contact = persons.find(c => c.id === id)
    const changedPerson = {...contact, number: changedNumber}
    
    personService
    .update(id, changedPerson)
    .then(returnedContact => {
      setPersons(persons.map(person => person.id !== id ? person : returnedContact))
    })
    .catch(() => {
      window.alert(`The person ${changedPerson.name} was already deleted from the server!`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber,
      }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (existingPerson.number == newNumber){
        window.alert(`${newName} is already added to the phonebook with this phone number`)
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          changeNumber(existingPerson.id, newNumber)
        }
      }
    } else {
      personService
      .create(personObject)
      .then(newContact => setPersons(persons.concat(newContact)))
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => 
        setPersons(persons.filter(person => person.id !== id)))
      .catch(() => {
        window.alert(`The person ${name} was already deleted from the server!`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToDisplay = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <AddPersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <AllNumbersDisplay persons={personsToDisplay} removePerson={removePerson}/>
    </div>
  )
}

export default App