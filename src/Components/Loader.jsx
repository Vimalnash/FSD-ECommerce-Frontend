
export function Loader() {
    return (
        <div className="animate-pulse w-full min-h-screen flex flex-col justify-center items-center gap-6 bg-gradient-to-r from-gray-300 to-gray-50 text-slate-600 opacity-50">
            <div className="animate-bounce">
                <div className="rounded-full bg-blue-500 h-10 w-10"></div>
            </div>
            <h2 className="text-lg font-semibold text-center bg-slate-200">
                Loading Please Wait...
            </h2>

        </div>
    )
};
