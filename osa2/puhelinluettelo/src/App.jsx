import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const Persons = ({ persons, onRemove }) => (
  <ul>
    {persons.map(person => <Person key={person.name} person={person} onRemove={onRemove}/>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
}, [])
console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()

    const nameExisting = persons.map(person => person.name).includes(newName)

    if (nameExisting) {
      const ok = window.confirm(
        `${newName}, is already added to phonebook, replace the old number with a new one?`)
      if (!ok) return

      const existing = persons.find(p => p.name === newName)
      if (!existing) return

      const changedPerson = { ...existing, number: newNumber }

      personService
        .update(existing.id, changedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `${changedPerson.name}'s number changed`
          )
          setType('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${changedPerson.name} has already been removed from server`
          )
          setType('error')
          setPersons(persons.filter(p => p.id !== existing.id))
          console.error("Update failed" + error)
        })
        return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Added ${personObject.name}`
        )
        setType('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

/*     setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
 */  
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(
        `Deleted ${person.name}`
        )
        setType('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

      .catch(error => {
        console.error('Couldnt delete,' + error)
      })
    }
  }

  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : []  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message ={errorMessage} type={type}/>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <Persons persons={filteredPersons} />

      <h3>add a new</h3>
      <PersonForm
      onSubmit={addPerson}
      newName={newName}
      onNameChange={(event) => setNewName(event.target.value)}
      newNumber={newNumber}
      onNumberChange={(event) => setNewNumber(event.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons ={persons} onRemove={removePerson}/>
    </div>
  )

}

export default App