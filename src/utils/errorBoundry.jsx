
import { useRouteError } from "react-router-dom";

export default function GlobalErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong 😢</h1>
            <p className="text-gray-700 mb-2">
                {error.statusText || error.message || "Unexpected error occurred"}
            </p>
            <a
                href="/"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
                Go Back Home
            </a>
        </div>
    );
}
