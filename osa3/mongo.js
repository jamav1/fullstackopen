const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://wwaltsuu_db_user:${password}@cluster0.ytbv0pb.mongodb.net/?appName=phoneBook`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook')
        persons.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(() => {
        console.log('added', person.name, 'number', person.number, 'to phonebook')
        mongoose.connection.close()
    })
}

/*const newName = process.argv[3] 
const newNumber = process.argv[4]

const person = new Person ({
    name: newName,
    number: newNumber,
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})

Person.find ({}).then(result => {
    result.forEach(person => {
        console.log(person.name)
    })
    mongoose.connection.close()
})
    */
