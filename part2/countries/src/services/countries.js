import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (filteredCountries) => {
    const request = axios.get(`${baseUrl}/name/${filteredCountries[0].name.common.toLowerCase()}`)
    return request.then(response => response.data)
}


export default { getAllCountries, getCountry }