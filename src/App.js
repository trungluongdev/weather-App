import React, { useState, useEffect } from 'react'
import './App.css'
const API = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "49731323aeb3ceb7754bbb21bf4ebeec"
}

function App() {
    const [cityInput, setCityInput] = useState("")
    const [searchCity, setSearchCity] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMassage, setErrorMessage] = useState("")
    const [weatherInfo, setWeatherInfo] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(cityInput)
    }

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true)
            try {
                const url = `${API.base}/weather?q=${cityInput}&APPID=${API.key}`
                const response = await fetch(url)
                const data = await response.json()
                if (response.ok) {
                    // setWeatherInfo(JSON.stringify(data))
                    setWeatherInfo(`Country: ${data.sys.country} ${data.name} Weather: ${data.weather[0].main} ${data.weather[0].description}  `)
                    setErrorMessage("")
                }
                // else if (!cityInput) {
                //     setCityInput("")
                //     setWeatherInfo("")
                // }
                else {
                    setErrorMessage(data.message)
                }
            } catch (error) {
                setErrorMessage(error)
            }
            setLoading(false)

        }
        fetchWeatherData()
    }, [searchCity, cityInput])


    return (
        <div className="app-container">
            <form className="weather-form" onSubmit={handleSubmit}>
                <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} type='search' placeholder='city name'></input>
                <button>Submit</button>
            </form>
            <div className="result-container">
                {loading ? (<div className="loading">Loading...</div>) : (<> {errorMassage ? (<div className="error-message" style={{ color: "red" }}>{errorMassage}</div>) : (<div className="weather-info">{weatherInfo}</div>)}</>
                )}
            </div>


        </div>
    )
}

export default App