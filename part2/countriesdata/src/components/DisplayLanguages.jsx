const DisplayLanguages = ({ languages }) => {
  return (
    <>
      <h1>Languages</h1>
      <ul>
        {Object.values(languages).map(value => {
          return <li key={value}>{value}</li>
        }
        )}
      </ul>
    </>
  )
}

export default DisplayLanguages