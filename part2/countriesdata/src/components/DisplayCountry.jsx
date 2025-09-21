import DisplayLanguages from './DisplayLanguages'

const DisplayCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area} km<sup>2</sup></div>
      <DisplayLanguages languages={country.languages}/>
      <img src={`${country.flags.png}`} alt={`Flag of ${country.name.common}`}/>
    </div>
  )
}

export default DisplayCountry