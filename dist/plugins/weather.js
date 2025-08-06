import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
if (!OPENWEATHER_API_KEY) {
    throw new Error('Missing OPENWEATHER_API_KEY in environment variables.');
}
export async function runWeatherPlugin(message) {
    const city = extractCityFromMessage(message) || 'Bangalore';
    try {
        const weather = await fetchWeather(city);
        return `The weather in ${city} is ${weather.temperature}°C and ${weather.description}.`;
    }
    catch (error) {
        console.error(`Weather fetch error for "${city}":`, error);
        return `Sorry, I couldn't fetch the weather for ${city}.`;
    }
}
function extractCityFromMessage(message) {
    const match = message.match(/in\s+([a-zA-Z\s]+)/i);
    const city = match?.[1]?.trim() || null;
    if (!city)
        return null;
    // Handle common city name variations
    const cityMap = {
        'banglore': 'bangalore',
        'bengaluru': 'bangalore',
        'bombay': 'mumbai',
        'calcutta': 'kolkata',
        'madras': 'chennai',
        'new york city': 'new york',
        'nyc': 'new york',
        'la': 'los angeles',
        'sf': 'san francisco',
        'dc': 'washington',
        'd.c.': 'washington'
    };
    const lowerCity = city.toLowerCase();
    return cityMap[lowerCity] || city;
}
async function fetchWeather(city) {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const response = await axios.get(url, {
        params: {
            q: city,
            appid: OPENWEATHER_API_KEY,
            units: 'metric'
        },
    });
    const data = response.data;
    return {
        temperature: data.main.temp,
        description: data.weather[0].description,
    };
}
