import { isRouteErrorResponse, useRouteError } from "react-router-dom";

// Error Page Component
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let title = 'Something went wrong';
    let message = '';

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data?.message || '';
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="max-w-md text-center">
                <h1 className="text-2xl font-bold mb-2">{title}</h1>
                {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        </div>
    );
}
