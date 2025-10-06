import { useState, useEffect } from 'react'
import AllNumbersDisplay from './components/AllNumbersDisplay'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  },[])

  const changeErrorMessage = (message, type) => {
    setErrorMessage({text: message, type})
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const changeNumber = (id, changedNumber) => {
    const contact = persons.find(c => c.id === id)
    const changedPerson = {...contact, number: changedNumber}
    
    personService
    .update(id, changedPerson)
    .then(returnedContact => {
        changeErrorMessage(`${changedPerson.name}'s phone number was updated`, 'success')
        setPersons(persons.map(person => person.id !== id ? person : returnedContact))
        setNewName('')
        setNewNumber('')
    })
    .catch(error => {
        const message = error.response?.data?.error || 'Failed to update contact'

        if (error.response?.status === 404) {
          changeErrorMessage(`Information of ${changedPerson.name} has already been removed from the server!`, 'fail')
          setPersons(persons.filter(person => person.id !== id))
        } else {
          changeErrorMessage(message, 'fail')
        }
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
        changeErrorMessage(`${newName} is already added to the phonebook with this phone number`, 'fail')
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          changeNumber(existingPerson.id, newNumber)
        }
      }
    } else {
      personService
      .create(personObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        changeErrorMessage(`Added ${newContact.name}`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const message = error.response?.data?.error || 'Failed to add contact'
        changeErrorMessage(message, 'fail')
      })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        changeErrorMessage(`Deleted ${name}`, 'success')
      })
      .catch(() => {
        changeErrorMessage(`Information of ${name} has already been removed from the server!`, 'fail')
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
      <Notification message={errorMessage?.text} type={errorMessage?.type}/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <AddPersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <AllNumbersDisplay persons={personsToDisplay} removePerson={removePerson}/>
    </div>
  )
}

export default App