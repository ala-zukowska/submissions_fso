const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => {
  return parts.map(part => (
      <div key={part.id}>
        <Part part={part}/>
      </div>
    ))
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <b>total of {props.total} exercises</b>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((total, part) => total += part.exercises, 0)}
      />
    </div>
  )
}

export default Course