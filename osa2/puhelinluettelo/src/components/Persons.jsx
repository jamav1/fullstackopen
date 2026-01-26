const Persons = ({ persons, onRemove }) => (
  <ul>
    {persons.map(person => <Person key={person.name} person={person} onRemove={onRemove}/>)}
  </ul>
)

export default Persons