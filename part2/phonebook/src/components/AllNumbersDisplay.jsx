import SinglePersonDisplay from './SinglePersonDisplay'

const AllNumbersDisplay = ({ persons, removePerson }) => 
    persons.map(person => 
    <SinglePersonDisplay 
    key={person.id} 
    person={person} 
    removePerson={() => removePerson(person.id, person.name)}
    />)

export default AllNumbersDisplay