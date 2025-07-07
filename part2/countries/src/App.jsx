import { useEffect, useState } from 'react'
import axios from 'axios'
import CountrySearch from './components/CountrySearch'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'
import CountryServices from './services/countries'

const App = () => {
  
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  
  const filteredCountries = countries?.filter(
      country => country.name.common.toLowerCase().includes(countryName.toLowerCase())
  )

  useEffect(()=>{
    CountryServices.getAllCountries()
    .then(countryList => {
      console.log(countryList)
      setCountries(countryList)
    })
    .catch(error => {
      console.error('Failed to fetch countries', error)
    })
  },[])
  
  useEffect(() => {
    if(filteredCountries.length === 1){
      CountryServices.getCountry(filteredCountries)
      .then(countryInfo => {
        console.log(countryInfo)
        setCountry(countryInfo)
      })
      .catch(error => {
        console.error('Failed to fetch country details', error)
      })
    }
  },[countryName])

  return (
    <>
      <CountrySearch countryName={countryName} setCountryName={setCountryName}/>
      {filteredCountries.length === 1 && country ? (
        <CountryDetails country={country} />
      ):(
        <Countries countryName={countryName} filteredCountries={filteredCountries} />
      )}
    </>
  )
}

export default App