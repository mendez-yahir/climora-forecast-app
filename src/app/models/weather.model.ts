// weather.model.ts

export interface Weather {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    weatherDescription: string;
}

export interface Forecast {
    date: string; // YYYY-MM-DD format
    weather: Weather;
}

export interface WeatherResponse {
    current: Weather;
    forecast: Forecast[];
}

export interface Location {
    city: string;
    country: string;
}