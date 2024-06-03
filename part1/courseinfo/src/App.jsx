const Header = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name}: {props.number}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.namelist[0]} number={props.numberlist[0]}/>
      <Part name={props.namelist[1]} number={props.numberlist[1]}/>
      <Part name={props.namelist[2]} number={props.numberlist[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.number}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content namelist={[part1,part2,part3]} numberlist={[exercises1,exercises2,exercises3]} />
      <Total number={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App