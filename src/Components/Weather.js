import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const Weather = ({ apiKey, location }) => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, [apiKey, location]);

    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'Clear':
                return <FontAwesomeIcon icon={faSun} />;
            case 'Clouds':
                return <FontAwesomeIcon icon={faCloud} />;
            case 'Rain':
                return <FontAwesomeIcon icon={faCloudRain} />;
            case 'Snow':
                return <FontAwesomeIcon icon={faSnowflake} />;
            default:
                return <FontAwesomeIcon icon={faCloudSun} />;
        }
    };

    const formatWeather = () => {
        if (weatherData && weatherData.list) {
            const dailyWeather = {};
            // Group weather data by day and calculate average temperature for each day
            weatherData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                if (!dailyWeather[date]) {
                    dailyWeather[date] = {
                        temperature: item.main.temp,
                        weather: item.weather[0].main,
                        count: 1
                    };
                } else {
                    dailyWeather[date].temperature += item.main.temp;
                    dailyWeather[date].count += 1;
                }
            });

            // Calculate average temperature for each day
            Object.keys(dailyWeather).forEach(date => {
                dailyWeather[date].temperature /= dailyWeather[date].count;
            });

            // Format and display the weather data
            return Object.keys(dailyWeather).map(date => (
                <div key={date} className="col-sm-4 mb-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">{date}</h5>
                            <p className="card-text">{getWeatherIcon(dailyWeather[date].weather)} {dailyWeather[date].temperature.toFixed(1)}°C</p>
                        </div>
                    </div>
                </div>
            ));
        } else {
            return <p>Loading...</p>;
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">5 Days Weather Forecast</h2>
            <div className="row">
                {formatWeather()}
            </div>
        </div>
    );
};

export default Weather;
