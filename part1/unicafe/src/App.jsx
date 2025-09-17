import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, counter, textAfter = "" }) => <div>{text} {counter}{textAfter}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avrSum, setAvrSum] = useState(0)

  const handleSetGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAvrSum(avrSum + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAvrSum(avrSum - 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleSetGood} text="good"/>
      <Button onClick={handleSetNeutral} text="neutral"/>
      <Button onClick={handleSetBad} text="bad"/>
      <h1>statistics</h1>
      <Display text="good" counter={good}/>
      <Display text="neutral" counter={neutral}/>
      <Display text="bad" counter={bad}/>
      <Display text="all" counter={total}/>
      <Display text="average" counter={avrSum/total}/>
      <Display text="positive" counter={(good/total)*100} textAfter=' %'/>
    </div>
  )
}

export default App