export async function fetchWeather(latitude, longitude) {
    try {
        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            isNaN(latitude) ||
            isNaN(longitude)
        ) {
            throw new Error("Invalid location coordinates.");
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(
                `Weather API error: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();

        if (!data.current_weather) {
            throw new Error("Weather data unavailable for this location.");
        }

        return data;
    } catch (err) {
        console.error("fetchWeather error:", err);
        throw err;
    }
}
