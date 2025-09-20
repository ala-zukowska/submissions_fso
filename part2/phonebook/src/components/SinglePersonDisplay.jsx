const SinglePersonDisplay = ({ person, removePerson }) => {
  return <p>
    {person.name} {person.number} 
    <button onClick={removePerson}>delete</button>
  </p>
}

export default SinglePersonDisplay