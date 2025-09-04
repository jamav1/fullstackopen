const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercixes}
  </li>
)

const Content = ({ parts }) => (
<ul>
  {parts.map(part => (
    <Part key={part.id} part={part} />
  ))}
</ul>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0)
  return <p>total of {total} exercises</p>
}

const Course = ({ course }) => (
  <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
  </div>
)

export default Course