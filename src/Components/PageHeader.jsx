
// Displays Page Titles
export function PageHeader({children}) {
    return (
        <>
            <div className="p-2 text-4xl font-semibold text-center bg-blue-100">
                {children}
            </div>
        </>
    )
};
