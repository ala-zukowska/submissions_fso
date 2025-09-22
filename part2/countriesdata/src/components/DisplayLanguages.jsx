const DisplayLanguages = ({ languages }) => {
  return (
    <>
      <h2>Languages</h2>
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