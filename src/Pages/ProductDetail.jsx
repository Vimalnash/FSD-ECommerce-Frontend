import { Link } from "react-router-dom";
import Button from "../Layouts/Button";
import imgWelcome from "../assets/img/welcome.jpg"
import Navbar from "../Components/Navbar";

// Landing Page Loading view Section
const ProductDetail = () => {
    const backgroundColor = "bg-brightColor"
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="min-h-screen lg:h-90vh flex flex-col justify-center bg-white gap-10 p-5 px-5 md:px-32 lg:flex-row items-center">
                <div className="flex flex-col gap-4 text-center lg:text-start">
                    <h2 className="text-5xl font-semibold leading-tight">Your Dream Search to Buy Items Ends Here</h2>
                    <p>You will be finding the variety and finest products available.</p>
                    <div className="flex flex-row justify-center lg:justify-start lg:p-5">
                        <Link to="destination" spy={true} smooth={true} >
                            <Button title="Search" backgroundColor={backgroundColor} />
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-2/4">
                    <img className="shadow-[0_0_60px_20px_white] md:shadow-[0_0_60px_30px_white] " src={imgWelcome} alt="imgWelcome" />
                </div>
            </div>
        </>
    )
};

export default HomePage;