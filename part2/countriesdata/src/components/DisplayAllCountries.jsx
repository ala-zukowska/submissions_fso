const DisplayMatchingCountries = ({ countries, showCountry }) => {
   return (
      <div>
        {countries.map((country) => {
          const countryName = country.name.common
          return (
            <div key={countryName}>{countryName} <button onClick={() => 
              showCountry(country)}>Show</button>
            </div>
          )
        })}
      </div>
    )
}

export default DisplayMatchingCountries