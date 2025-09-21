import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilterCountries from './components/FilterCountries'
import DisplayMatchingCountries from './components/DisplayAllCountries'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(()=>{
    countryService
    .getAll()
    .then(allCountries => setCountries(allCountries))
  },[])

  const findCountry = event => {
    setNewCountry(event.target.value)
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

  return (
    <div>
      <FilterCountries value={newCountry} onChange={findCountry}/>
      {countriesToDisplay.length === 1 && selectedCountry ? (
        <DisplayCountry country={selectedCountry}/>
      ) : null}

      {countriesToDisplay.length > 1 && countriesToDisplay.length <= 10 ? (
        <DisplayMatchingCountries countries={countriesToDisplay} />
      ) : null}

      {countriesToDisplay.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : null}
    </div>
  )
}

export default App