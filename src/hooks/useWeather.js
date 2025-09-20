import { useState, useRef } from "react";
import { fetchWeather } from "../api/weatherApi";

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // AbortController to cancel previous requests
    const abortControllerRef = useRef(null);

    const getWeatherByCity = async (cityName) => {
        if (!cityName || cityName.trim() === "") {
            setError("Please enter a city name.");
            setWeather(null);
            return;
        }

        // Cancel previous fetch if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true);
            setError(null);
            setWeather(null);

            // Fetch city coordinates from Geocoding API
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    cityName
                )}&count=1`,
                { signal: controller.signal }
            );

            if (!geoRes.ok)
                throw new Error("Failed to fetch city coordinates.");

            const geoData = await geoRes.json();
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found.");
            }

            const { latitude, longitude, name } = geoData.results[0];

            // Fetch weather data
            const data = await fetchWeather(latitude, longitude);

            // Provide defaults for missing fields
            const safeWeather = {
                temperature: data?.current_weather?.temperature ?? "--",
                windspeed: data?.current_weather?.windspeed ?? "--",
                weathercode: data?.current_weather?.weathercode ?? 0,
                city: name,
            };

            setWeather(safeWeather);
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Previous fetch aborted.");
                return;
            }
            setError(err.message || "Something went wrong.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, getWeatherByCity };
}
