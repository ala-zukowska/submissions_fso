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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content namelist={[part1.name,part2.name,part3.name]} numberlist={[part1.exercises,part2.exercises,part3.exercises]} />
      <Total number={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

export default App