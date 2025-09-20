export default function ErrorMessage({ message }) {
    return (
        <div className="bg-red-500/30 backdrop-blur-md text-white px-4 py-2 rounded-lg max-w-md text-center border border-red-200/40">
            {message || "Something went wrong. Please try again."}
        </div>
    );
}
