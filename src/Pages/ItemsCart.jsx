import { RiSendBackward } from "react-icons/ri";
import Navbar from "../Components/Navbar";
import Button from "../Layouts/Button";

// Items Cart Page
export function ItemsCart({children}) {
    const backgroundColor = "bg-yellow-50"

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center items-center p-2 text-4xl font-semibold text-center bg-gray-100">
                
                <Button title="GoBack" backgroundColor={backgroundColor} path="/">
                    <RiSendBackward />
                </Button>
                <h2>Welcome to the Cart Page</h2>
                <p>Under Construction. Will Launch in Few Days.</p>
                {children}
            </div>
        </>
    )
};
