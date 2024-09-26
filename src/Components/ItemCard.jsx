import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiMoneyRupeeCircleFill, RiStarSFill } from "react-icons/ri";
import { useAppContext } from "../Context/AppContext";
import noImageLabel  from "../assets/img/ItemImage.png";
import { Link } from "react-scroll";


export function ItemCard({item}) {
    const navigate = useNavigate();
    const {cartCount, setCartCount} = useAppContext();

    const [show, setShow] = useState(true);

    function itmAddBtn(){
        setCartCount((cartCount) => cartCount + 1);
        setShow(!show);
    };
    function itmRemoveBtn(){
        setCartCount((cartCount) => cartCount - 1);
        setShow(!show);
    };
    
    let imgUrl
    if (item.imgUrl == null || item.imgUrl == "") {
        imgUrl = noImageLabel;
    } 
    if (item.imgUrl) {
        imgUrl = item.imgUrl;
    }

    return (
        <div className="w-[230px] sm:w-[250px] sm:h-[350px] md:h-[380px] lg:h-[400px] xl:h-[400px] flex flex-col justify-center items-center  border shadow hover:shadow-xl border-gray-200 rounded-md hover:bg-gray-200 hover:border-2 hover:border-gray-300" >
            <Link 
                className="w-full h-full flex flex-col justify-center items-center rounded-t-md hover:bg-gray-200 hover:border-2 hover:border-gray-300 hover:cursor-pointer"
                to="navbar" 
                onClick={() => {
                    navigate(`/items/${item._id}`); 
                    setTimeout(() => {
                        location.reload();
                    }, 1000);  
                    }} 
                spy={true} smooth={true} duration={500}
            >
                <div className="w-full h-40 md:h-40 lg:60 xl:60 rounded-t-md">
                    <img src={imgUrl} className="w-full h-40 md:h-40 lg:60 xl:60 rounded-t-md"  alt="Image Not Available" />
                </div>
                <div className="flex flex-col gap-4 w-full p-2 bg-lime-50 sm:text-xs md:text-sm lg:text-base">
                    <div className="flex flex-col gap-2 sm:text-xs md:text-sm lg:text-base">
                        <div>
                            <h2 className="flex text-yellow-400  xs:text-xs sm:text-sm md:text-base lg:text-lg">
                                <span className="text-yellow-700"><RiStarSFill /></span>
                                <span className="text-yellow-700"><RiStarSFill /></span>
                                <span className="text-yellow-700"><RiStarSFill /></span>
                                <span className="text-yellow-700"><RiStarSFill /></span>
                                <span className=""><RiStarSFill /></span>
                            </h2>
                        </div>
                        <h3 className="font-semibold h-14 sm:text-sm md:text-base lg:text-lg">{item.itemName}</h3>
                        <p className="flex sm:text-xs md:text-sm lg:text-base">
                            <RiMoneyRupeeCircleFill />
                            <span className="text-xl font-bold  xs:text-xs sm:text-sm md:text-base lg:text-lg">{item.sellingPrice}</span>
                        </p>
                    </div>
                </div>
            </Link>
            <div className="w-full h-full rounded-b-md bg-gray-200 flex flex-wrap justify-center items-center gap-2">
                {show ?
                (
                    <button 
                        className="btn btn-sm bg-green-700 text-yellow-100 border-2 border-yellow-200 rounded-full hover:bg-yellow-100 hover:text-black hover:border-green-700 focus:bg-yellow-100 focus:outline-none focus:border-green-700 focus:text-black transition-all ease-in-out duration-300" 
                        onClick={() => itmAddBtn()}
                    >
                        Add to Cart
                    </button>
                )
                :
                (
                    <button 
                        className="btn btn-sm bg-yellow-500 text-yellow-100 border-2 border-yellow-200 rounded-full hover:bg-yellow-100 hover:text-black hover:border-green-700 focus:bg-yellow-100 focus:outline-none focus:border-green-700 focus:text-black transition-all ease-in-out duration-300" 
                        onClick={() => itmRemoveBtn()}
                    >
                        Remove from Cart
                    </button>
                )
                }
                <Link 
                    to="navbar" 
                    onClick={() => {
                        navigate(`/items/${item._id}`); 
                        setTimeout(() => {
                            location.reload();
                        }, 1000);  
                        }} 
                    spy={true} smooth={true} duration={500}
                >
                    <button 
                        className={`btn btn-sm px-6 py-2 bg-yellow-200 flex flex-row items-center text-black rounded-full hover:bg-yellow-100 hover:outline-yellow-500 hover:shadow-[inset_0px_0px_5px_3px_orange] focus:outline-none focus:outline-yellow-500 focus:shadow-[inset_0px_0px_5px_3px_orange] transition-all ease-in-out duration-300 hidden md:inline`}
                    >Details
                    </button>
                </Link>
            </div>
        </div>
    )
};
