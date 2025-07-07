const CountrySearch = ({countryName, setCountryName}) => {
  return (
    <p>find countries <input value={countryName} onChange={(e) => setCountryName(e.target.value)} /></p>
  )
}

export default CountrySearch