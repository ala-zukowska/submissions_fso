import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ text, value, textAfter = "" }) => <div>{text} {value}{textAfter}</div>

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad
  const avrSum = good - bad

  if (total === 0) {
    return <p>
      No feedback given
    </p>
  }

  return <div>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={total}/>
      <StatisticsLine text="average" value={avrSum/total}/>
      <StatisticsLine text="positive" value={(good/total)*100} textAfter=' %'/>
  </div>

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App