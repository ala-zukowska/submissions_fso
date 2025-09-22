import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilterCountries from './components/FilterCountries'
import DisplayMatchingCountries from './components/DisplayAllCountries'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(()=>{
    countryService
    .getAll()
    .then(allCountries => setCountries(allCountries))
  },[])

  const findCountry = event => {
    setNewCountry(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const countriesToDisplay = countries.filter(country => country.name.common?.toLowerCase().includes(newCountry.toLowerCase()))
  
  useEffect(()=>{
    if (countriesToDisplay.length === 1){
      const countryName = countriesToDisplay[0].name.common
      if (!selectedCountry || selectedCountry.name.common !== countryName) {
        countryService
        .getCountry(countryName)
        .then(country => setSelectedCountry(country))
      }
    } 
  },[countriesToDisplay, selectedCountry])

  useEffect(() => {
    if (selectedCountry) {
      countryService
      .getCoordinates(selectedCountry.capital[0], api_key)
      .then(latLonData => {
        const lat = latLonData[0].lat
        const lon = latLonData[0].lon
        return countryService.getWeather(lat, lon, api_key)
      })
      .then(weatherData => {
        setWeather(weatherData)
      })
    }
  }, [selectedCountry, api_key]);

  return (
    <div>
      <FilterCountries value={newCountry} onChange={findCountry}/>
      {selectedCountry ? (
        <DisplayCountry country={selectedCountry} weather={weather}/>
      ) : null}

      {countriesToDisplay.length > 1 && countriesToDisplay.length <= 10 && !selectedCountry ? (
        <DisplayMatchingCountries 
          countries={countriesToDisplay} 
          showCountry={country => 
            countryService.getCountry(country.name.common)
              .then(c => setSelectedCountry(c))
          }/>
      ) : null}

      {countriesToDisplay.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : null}
    </div>
  )
}

export default App