const Person = ({ person, onRemove })  => {
  const label = 'delete' 

  return (
  <li>
    {person.name} {person.number}
    <button onClick={() => onRemove(person.id)}>{label}</button>
    </li>
  )
}

export default Person