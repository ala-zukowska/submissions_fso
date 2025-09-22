import DisplayLanguages from './DisplayLanguages'
import DisplayWeather from './DisplayWeather'

const DisplayCountry = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area} km<sup>2</sup></div>
      <DisplayLanguages languages={country.languages}/>
      <img src={`${country.flags.png}`} alt={`Flag of ${country.name.common}`}/>
      <DisplayWeather city={country.capital[0]} weather={weather}/>
    </div>
  )
}

export default DisplayCountry