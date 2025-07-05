import { useState } from 'react'

const Button = ({onClick, value}) => <button onClick={onClick}>{value}</button>

const Statistics = ({good,neutral,bad,total,average,posPercentage}) => {
  return total > 0 ? (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={posPercentage} />
        </tbody>
      </table>
    </>
  ) : <p>No feedback given</p>
}

const StatisticLine = ({text, value}) => {
  return text === "positive" ? (
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
  ) : (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const average = (good*1 + neutral*0 + bad*-1)/total
  const posPercentage = (good/total) * 100
  
  
  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good + updatedNeutral + bad);
  }

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} value="good" />
      <Button onClick={handleNeutral} value="neutral"/>
      <Button onClick={handleBad} value="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} 
       total={total} average={average} posPercentage={posPercentage} />
    </>
  )
}

export default App