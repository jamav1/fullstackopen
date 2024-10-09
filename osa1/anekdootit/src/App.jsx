import { useState } from 'react'

const Button = (props) => (
  <div>
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  </div>
)

const Header = ( {h1} ) => <h1>{h1}</h1>

const VoteTxt = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const MostVoted = ({ anecdotes, votes }) => {
  const mostVotes = Math.max(...votes)
  const mostVotesIndex = votes.indexOf(mostVotes)

  if (mostVotes === 0) {
    return (
      <p>no votes yet</p>
    )
  }
return (
  <VoteTxt text={anecdotes[mostVotesIndex]} votes={mostVotes} />
)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [vote, setVoted] = useState(Array(anecdotes.length).fill(0))
  
  console.log('value now', selected)

  const setToSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const voteSelected = () => {
    const copyVotes = [...vote]
    copyVotes[selected] += 1
    setVoted(copyVotes)
  }

  return (
    <div>
      <Header h1='Anecdote of the day' />
      <VoteTxt text={anecdotes[selected]} votes={vote[selected]} />
      <Button handleClick={setToSelected} text='next anecdote' />
      <Button handleClick={voteSelected} text='vote' />
      <Header h1='Anecdote with most votes' />
      <MostVoted anecdotes={anecdotes} votes={vote} />
    </div>
  )
}

export default App

// nappi joka näyttää satunnaisen anekdootin
// selected on random total
// nappi laittaa selected arvoksi random total 
// Nappi joka lisää yhden äänen valitulle anekdootille
// Ollaan valittu random anekdootti
// Vote antaa siihen kohtaa taulukkoa arvon +1