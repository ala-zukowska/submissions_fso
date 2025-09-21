const FilterCountries = ({ value, onChange}) => {
  return <form>
        <div>
          find country <input
          value={value}
          onChange={onChange}/>
        </div>
      </form>
}

export default FilterCountries