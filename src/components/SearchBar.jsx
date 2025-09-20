import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const debounceTimeout = useRef(null);

    // Debounce input changes
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (input.trim().length >= 3) {
                // minimum 3 chars
                setDebouncedInput(input.trim());
            }
        }, 500); // wait 500ms after typing stops

        return () => clearTimeout(debounceTimeout.current);
    }, [input]);

    // Call API when debounced input changes
    useEffect(() => {
        if (debouncedInput) onSearch(debouncedInput);
    }, [debouncedInput]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            alert("Please enter a city name.");
            return;
        }
        if (input.trim().length < 3) {
            alert("Please enter at least 3 characters.");
            return;
        }
        onSearch(input.trim());
        setInput("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md h-14 sm:h-12 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-md flex items-center px-4 sm:px-3 py-2 transition-all duration-300
                 hover:bg-white/25 focus-within:ring-2 focus-within:ring-white/50"
        >
            {/* Search icon */}
            <Search className="text-white/70 mr-2 flex-shrink-0" size={20} />

            {/* Input field */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search city..."
                className="flex-1 bg-transparent outline-none text-white placeholder-white/70 text-base sm:text-sm py-2 sm:py-1"
            />

            {/* Search button */}
            <button
                type="submit"
                className="ml-2 px-4 sm:px-3 py-2 sm:py-1 bg-white/20 text-white font-semibold rounded-2xl hover:bg-white/30 transition duration-300 text-sm sm:text-xs"
            >
                Search
            </button>
        </form>
    );
}
