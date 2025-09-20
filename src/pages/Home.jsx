import { useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
    const { weather, loading, error, getWeatherByCity } = useWeather();
    const [city, setCity] = useState("");

    // Show alert whenever error changes
    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    const handleSearch = async (cityName) => {
        if (!cityName || cityName.trim() === "") {
            alert("Please enter a valid city name.");
            return;
        }

        setCity(cityName);

        try {
            await getWeatherByCity(cityName);
        } catch (err) {
            // Catch any unexpected errors from the hook
            alert("An unexpected error occurred: " + err.message);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 px-4 py-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white/90 drop-shadow-lg tracking-wide select-none">
                Weather Now
            </h1>

            {/* Search input */}
            <SearchBar onSearch={handleSearch} />

            {/* Status UI */}
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {weather && !loading && !error && (
                <WeatherCard weather={weather} city={weather.city || city} />
            )}
        </div>
    );
}
