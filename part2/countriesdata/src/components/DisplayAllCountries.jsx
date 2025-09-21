const DisplayMatchingCountries = ({ countries }) => {
   return (
      <div>
        {countries.map((country) => {
          const countryName = country.name.common
          return <div key={countryName}>{countryName}</div>
        })}
      </div>
    )
}

export default DisplayMatchingCountries