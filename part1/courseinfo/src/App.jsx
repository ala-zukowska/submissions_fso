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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header name={course} />
      <Content namelist={[parts[0].name,parts[1].name,parts[2].name]} numberlist={[parts[0].exercises,parts[1].exercises,parts[2].exercises]} />
      <Total number={parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )
}

export default App