import {
    Sun,
    Cloud,
    CloudDrizzle,
    CloudSnow,
    CloudLightning,
    Wind,
    Droplets,
    CloudRain,
    CloudFog,
} from "lucide-react";

// Map Open-Meteo weather codes to label + icon
const weatherMap = {
    0: { label: "Clear", icon: <Sun size={48} /> },
    1: { label: "Mainly Clear", icon: <Sun size={48} /> },
    2: { label: "Partly Cloudy", icon: <Cloud size={48} /> },
    3: { label: "Cloudy", icon: <Cloud size={48} /> },
    45: { label: "Fog", icon: <CloudFog size={48} /> },
    48: { label: "Depositing Rime Fog", icon: <CloudFog size={48} /> },
    51: { label: "Drizzle Light", icon: <CloudDrizzle size={48} /> },
    53: { label: "Drizzle Moderate", icon: <CloudDrizzle size={48} /> },
    55: { label: "Drizzle Dense", icon: <CloudDrizzle size={48} /> },
    61: { label: "Rain Light", icon: <CloudRain size={48} /> },
    63: { label: "Rain Moderate", icon: <CloudRain size={48} /> },
    65: { label: "Rain Heavy", icon: <CloudRain size={48} /> },
    71: { label: "Snow Light", icon: <CloudSnow size={48} /> },
    73: { label: "Snow Moderate", icon: <CloudSnow size={48} /> },
    75: { label: "Snow Heavy", icon: <CloudSnow size={48} /> },
    80: { label: "Rain Showers Light", icon: <CloudRain size={48} /> },
    81: { label: "Rain Showers Moderate", icon: <CloudRain size={48} /> },
    82: { label: "Rain Showers Heavy", icon: <CloudRain size={48} /> },
    95: { label: "Thunderstorm", icon: <CloudLightning size={48} /> },
    96: { label: "Thunderstorm with Hail", icon: <CloudLightning size={48} /> },
    99: {
        label: "Thunderstorm with Heavy Hail",
        icon: <CloudLightning size={48} />,
    },
};

export default function WeatherCard({ weather, city }) {
    const { label, icon } = weatherMap[weather.weathercode] || {
        label: "Unknown",
        icon: <Cloud size={48} />,
    };

    return (
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg p-6 text-center text-white">
            <h2 className="text-2xl font-semibold mb-2">{city}</h2>

            <div className="flex items-center justify-center gap-4 mb-4">
                {icon}
                <span className="text-6xl font-bold">
                    {weather.temperature ?? "--"}°C
                </span>
            </div>

            <p className="text-lg mb-4">{label}</p>

            <div className="flex justify-around text-sm">
                <div className="flex items-center gap-2">
                    <Droplets size={16} />
                    <span>Humidity: {weather.humidity ?? "--"}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wind size={16} />
                    <span>Wind: {weather.windspeed ?? "--"} km/h</span>
                </div>
            </div>
        </div>
    );
}
