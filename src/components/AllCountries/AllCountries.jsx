import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import SearchInput from "../Search/SearchInput"
import FilterCountry from "../FilterCountry/FilterCountry"

import { apiURL } from "../util/api"

const AllCountries = () => {
    // useState
    const [countries, setCountries] = useState([])
    const [searchCountries, setSearchCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    
    // get all countries
    const getAllCountires = async () => {
        try {
            const res = await fetch(`${apiURL}/all`)

            if(!res.ok) {
                setIsLoading(false)
                setError(`${res.status} Response Failed : ${res.statusText}`)

                return
            }

            const data = await res.json();

            setCountries(data)

            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    // get specific countries by name
    const getCountryByName = async (countryName) => {
        try {
            const res = await fetch(`${apiURL}/name/${countryName}`)

            console.log(res);

            if(!res.ok) {
                setIsLoading(false)
                setError("error, try again")

                return
            }

            const data = await res.json();

            setError("")

            console.log(data);

            
            setSearchCountries(data);   
            console.log(setSearchCountries);         
            setFilterCountries([])

            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const getCountryByRegion = async (regionName) => {
        try {
            setIsLoading(true)

            const res = await fetch(`${apiURL}/region/${regionName}`)

            if(!res.ok) {
                setIsLoading(false)
                setError("error, try again")

                return
            }

            const data = await res.json();

            setError("")

            console.log(data);
            setFilterCountries(data)
            setSearchCountries([])

            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    // reset filters
    const resetFilters = () => {
        setSearchCountries([])
        setFilterCountries([])
        setError("")
    }

    // call getAllCountries
    useEffect(() => {
        getAllCountires()
    }, [])

  return (
    <>
        
        <div className="all__country__wrapper">
            <div className="search">
                <SearchInput onSearch={getCountryByName} />
            </div>
            <div className="filter">
                <FilterCountry onSelect={getCountryByRegion} />
            </div>
            <div className="reset">
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
        </div>

        <div className="country__bottom attn__display">
            {error && !isLoading && <h4>{error}</h4>}
            {isLoading && !error && <h4>Loading...</h4>}
        </div>

        <div className="country__bottom">
            
            {searchCountries.length === 0 && filterCountries.length === 0 && countries?.map((country) => (
                <Link to={`/country/${country.name.common}`}>
                    <div className="country__card">
                        <div className="country__img">
                            <img src={country.flags.png} alt={country.name.common} />
                        </div>

                        <div className="country__data">
                            <h3>{country.name.common}</h3>
                            <h6>
                                {" "}
                                Population:{" "}
                                {new Intl.NumberFormat().format(country.population)}
                            </h6>
                            <h6>Region: {country.region}</h6>
                            <h6>Capital: {country.capital}</h6>
                        </div>
                    </div>
                </Link>
            ))}

            {filterCountries.length === 0 && searchCountries?.map((country) => (
                <Link to={`/country/${country.name.common}`}>
                    <div className="country__card">
                        <div className="country__img">
                            <img src={country.flags.png} alt={country.name.common} />
                        </div>

                        <div className="country__data">
                            <h3>{country.name.common}</h3>
                            <h6>
                                {" "}
                                Population:{" "}
                                {new Intl.NumberFormat().format(country.population)}
                            </h6>
                            <h6>Region: {country.region}</h6>
                            <h6>Capital: {country.capital}</h6>
                        </div>
                    </div>
                </Link>
            ))} 

            {searchCountries.length === 0 && filterCountries?.map((country) => (
                <Link to={`/country/${country.name.common}`}>
                    <div className="country__card">
                        <div className="country__img">
                            <img src={country.flags.png} alt={country.name.common} />
                        </div>

                        <div className="country__data">
                            <h3>{country.name.common}</h3>
                            <h6>
                                {" "}
                                Population:{" "}
                                {new Intl.NumberFormat().format(country.population)}
                            </h6>
                            <h6>Region: {country.region}</h6>
                            <h6>Capital: {country.capital}</h6>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </>
  )
}

export default AllCountries