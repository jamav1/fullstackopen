import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => (
  <h1>{text}</h1>
)

const StatisticLine = props =>
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
    </tr>

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    const total = (good+neutral+bad)
    const avg = ((-1*bad + good)/total)
    const positive = good/total*100 + "%"  

  if (total > 0)
  return (
  <table>
    <tbody>
  <StatisticLine value={good} name='good'/>
  <StatisticLine value={neutral} name='neutral'/>
  <StatisticLine value={bad} name='bad'/>
  <StatisticLine value={total} name='all' />
  <StatisticLine value={avg} name='average' />
  <StatisticLine value={positive} name='positive' />
  </tbody>
  </table>
  )
  else return (
    'No feedback given'
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const headertext = 'give feedback'
  const statistics = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text={headertext}/>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='Neutral' />
      <Button handleClick={increaseBad} text='Bad' />
      <Header text={statistics}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App