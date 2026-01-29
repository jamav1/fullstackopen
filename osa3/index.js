require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
app.use(express.static('dist'))

var morgan = require('morgan')

app.use(express.json())

//const password = process.argv[2]
//const url = `mongodb+srv://wwaltsuu_db_user:${password}@cluster0.ytbv0pb.mongodb.net/?appName=phoneBook`

//mongoose.set('strictQuery', false)
//mongoose.connect(url, { family: 4 })

//const personSchema = new mongoose.Schema({
//    content: String,
//    important: Boolean,
//})

//const Person = mongoose.model('Person', personSchema)
/*
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
*/

let persons = [
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

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    //response.json(persons)
})

app.get('/info', (request, response) => {
    const count = persons.length
    const time = new Date()

    response.send(`
    <p>Phonebook has info for ${count} persons </p>
    <p>${time}
    `)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    :0
    return String(maxId + 1)
}

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({error: 'name missing'})
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number missing'})
    }
    
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)