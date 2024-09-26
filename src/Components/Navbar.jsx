import React, { useState } from "react";
import { Link } from "react-scroll";
import Button from "../Layouts/Button";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { isAdminLoggedIn, isUserLoggedIn } from "../Helper/auth";
import { useAppContext } from "../Context/AppContext";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

// Function for Navbar section
const Navbar = () => {
    const navigate = useNavigate();
    const {loggedInUser, cartCount, setCartCount} = useAppContext();
    const [menu, setMenu] = useState(false);
    const backgroundColor = "bg-yellow-50"

    const handleChange = () => {
        setMenu(!menu)
    }

    return (
        <div id="navbar" className="relative">
            <div className="fixed left-0 top-0 z-40 w-full flex flex-row justify-between item-center bg-gray-600 text-white p-2 px-5 md:px-32">
                <div className="flex items-center">
                    <a href="/" >
                        <h3 className="text-xl font-semibold cursor-pointer">E-Commerce</h3>
                    </a>
                </div>
                <nav className="hidden lg:flex flex-row items-center gap-6">

                    <Link onClick={() => navigate("/")} to="items" spy={true} smooth={true} duration={500} 
                        className="cursor-pointer hover:scale-110 hover:text-brightColor transition-all ease-in-out duration-300"
                        >Search
                    </Link>

                </nav>
                {
                    isAdminLoggedIn() || isUserLoggedIn() ? (
                        <div className="hidden lg:flex flex-wrap justify-center items-center gap-3">
                            <label>Welcome {loggedInUser.userName} !</label>
            
                            <Button title="Logout" backgroundColor={backgroundColor} path="/">
                                <RiLogoutBoxFill />
                            </Button>
                        </div>

                    )
                    :
                    (
                        <div className="hidden lg:flex flex-wrap justify-center items-center gap-3">
                            <Button title="" backgroundColor={backgroundColor} path="/items/cart">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span>Cart - {cartCount}</span>
                            </Button>
                            <Button title="Signup" backgroundColor={backgroundColor} path="/signup">
                                <SiGnuprivacyguard />
                            </Button>
                            <Button title="Login" backgroundColor={backgroundColor} path="/login">
                                <RiLoginBoxFill />
                            </Button>
                        </div>
                    )
                }

                <div className="cursor-pointer flex items-center gap-2 lg:hidden " >
                    <Button title="" backgroundColor={backgroundColor} path="/items/cart">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span>- {cartCount}</span>
                    </Button>
                    <div onClick={handleChange}>
                        <AiOutlineMenu size={25}/>
                    </div>
                    {/* <AiOutlineMenu className="size-[24px]"/> //or */}
                </div>
                <div className={`${menu ? "translate-x-0" : "-translate-x-full"} w-full h-fit pt-8 pb-4 flex flex-col gap-8 bg-slate-500 text-white text-center text-xl font-semibold absolute left-0 top-20 lg:hidden transition-transform duration-300`}>
                    <Link onClick={() => navigate("/")} to="items" spy={true} smooth={true} duration={500} 
                        className="cursor-pointer hover:scale-110 hover:text-yellow-200 transition-all ease-in-out duration-300"
                        >Search
                    </Link>

                    {
                        isAdminLoggedIn() || isUserLoggedIn() ? (
                            <div>
                                <label>Welcome {loggedInUser.userName} !</label>
                                <Button title="Logout" backgroundColor={backgroundColor} path="/" />
                            </div>

                        )
                        :
                        (
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <Button title="Signup" backgroundColor={backgroundColor} path="/signup" />
                                <Button title="Login" backgroundColor={backgroundColor} path="/login" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Navbar;
            