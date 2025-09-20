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

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }    
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
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
      .catch(error => {
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