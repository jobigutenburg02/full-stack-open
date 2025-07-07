import { useState } from 'react'
import CountryDetails from './CountryDetails'

const Countries = ({countryName, filteredCountries}) => {

  const [selectedCountry, setSelectedCountry] = useState(null)
  
  const handleShowClick = ({country}) => {
    setSelectedCountry(country)
  }

  return (
    <>
    {countryName === '' ? null : (
        filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
        ) : (
            filteredCountries.map((country, index) => (
            <p key={index}>{country.name.common} <button onClick={()=>handleShowClick({country})}>Show</button> </p>
            ))
        )
    )}

    {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>
  )
}

export default Countries