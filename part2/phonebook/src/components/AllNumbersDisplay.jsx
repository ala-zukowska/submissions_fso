import SinglePersonDisplay from './SinglePersonDisplay'

const AllNumbersDisplay = ({ persons }) => persons.map(person => <SinglePersonDisplay key={person.name} person={person}/>)

export default AllNumbersDisplay