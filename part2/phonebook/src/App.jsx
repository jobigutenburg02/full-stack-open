import { useState, useEffect } from 'react'
import PersonService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    PersonService.getAllPersons()
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log(error)
      setErrorMessage("Error getting all persons")
    })
  }, [])

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const addPerson = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson){
      const isUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!isUpdate) return;
      
      const updatedPerson = {...existingPerson, number: newNumber}

      PersonService.updatePerson(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
        setSuccessMessage(`Updated ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`Error updating ${existingPerson.name}: ${error.response.data.error}`)
      })
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    PersonService.addPerson(newPerson)
    .then(createdPerson => {
      console.log(createdPerson)
      setPersons(persons.concat(createdPerson))
      setSuccessMessage(`Added ${createdPerson.name}`)
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(`Error adding ${newPerson.name}: ${error.response.data.error}`)
    })
  }

  const deletePerson = ({person, id}) => {
    const isDelete = window.confirm(`Delete ${person.name} ?`)
    if(!isDelete) return;

    PersonService.removePerson(id)
    .then(otherPersons => {
      console.log(otherPersons)
      setSuccessMessage(`Deleted ${person.name}`)
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(`Information of ${person.name} has already been removed from server`)
    })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App