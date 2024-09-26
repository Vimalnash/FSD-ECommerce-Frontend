import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { allurl, baseurl } from "../Handlers/BackendUrls";
import Navbar from "./Navbar";
import { RiMoneyRupeeCircleFill, RiStarSFill } from "react-icons/ri";
import { useAppContext } from "../Context/AppContext";
import noImageLabel  from "../assets/img/ItemImage.png";
import { Link } from "react-scroll";
import { ItemCard } from "./ItemCard";

export function ItemDetail() {
    
    const {id:itemId} = useParams();
    const [itemDetails, setItemDetails] = useState({});

    const {items} = useAppContext();

    const [show, setShow] = useState(true);
    const {cartCount, setCartCount} = useAppContext();

    // Handling Add and Remove from Cart buttons
    function itmAddBtn(){
        setCartCount((cartCount) => cartCount + 1);
      setShow(!show);
    };
    function itmRemoveBtn(){
      setCartCount((cartCount) => cartCount - 1);
      setShow(!show);
    };


    useEffect(() => {
        fetch(`${baseurl}/${allurl}/get/item/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.error) {
                console.log(data.error);
                setItemDetails(data.error);
            } else {
                setItemDetails(data.data);
            }
        })
    }, []);

    let imgUrl
    if (itemDetails.imgUrl == null || itemDetails.imgUrl == "") {
        imgUrl = noImageLabel;
    } 
    if (itemDetails.imgUrl) {
        imgUrl = itemDetails.imgUrl;

    }

    console.log("compare", items.length , itemDetails)
    return (
        <>
            <Navbar />
            <div className="h-14"></div>
            <div id="itemdetail" className="w-full min-h-screen flex flex-col flex-wrap gap-6 bg-gradient-to-r from-gray-300 to-gray-50 p-5 md:px-32 lg:flex-row">
                <div className="w-full flex flex-col gap-4 lg:flex-row">
                    <div className="border-2 shadow hover:scale-110 flex justify-center items-center lg:justify-start lg:items-start lg:pt-5 lg:w-[400px] lg:h-[500px]">
                        <img src={imgUrl} width={500} height={500} alt="Image Not Available" />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center p-2 lg:w-3/4 lg:justify-start lg:items-start">
                        <div>
                            <h2 className="text-2xl font-semibold text-center">
                                {itemDetails.itemTitleDisplay}
                            </h2>
                        </div>
                        <div>
                            <h2 className="flex text-yellow-400">
                                <span className="hover:text-yellow-700"><RiStarSFill /></span>
                                <span className="hover:text-yellow-700"><RiStarSFill /></span>
                                <span className="hover:text-yellow-700"><RiStarSFill /></span>
                                <span className="hover:text-yellow-700"><RiStarSFill /></span>
                                <span className="hover:text-yellow-700"><RiStarSFill /></span>
                            </h2>
                        </div>
                        <div>
                            <span className="font-semibold">Description : </span>
                            <p>
                                {itemDetails.description}
                            </p>
                        </div>
                        <div>
                            <p className="flex">
                                <RiMoneyRupeeCircleFill />
                                <span className="text-2xl font-bold">{itemDetails.sellingPrice}</span>
                            </p>
                        </div>
                        <div>
                                {
                                    itemDetails.qtyStock > 0 ? 
                                    <div className="text-xl font-semibold text-green-700">
                                        In stock - {itemDetails.qtyStock} {itemDetails.uomId.itemUomName}</div> 
                                    : 
                                    <div className="text-xl font-semibold text-red-500">Coming Soon</div>
                                }
                        </div>
                        <div className="flex gap-4">
                            {show ?
                            (
                                <button 
                                    type="button"
                                    onClick={() => itmAddBtn()}
                                    className={`px-6 py-2 bg-yellow-100 flex flex-row items-center text-black rounded-full hover:scale-110 hover:shadow-[inset_0px_0px_5px_3px_yellow] hover:text-black-800 focus:outline-none focus:scale-110 focus:border-yellow-500 focus:shadow-[inset_0px_0px_5px_3px_yellow] transition-all ease-in-out duration-300`}
                                >
                                    Add to Cart
                                </button>
                            )
                            :
                            (
                                <button 
                                    type="button"
                                    onClick={() => itmRemoveBtn()}
                                    className={`px-6 py-2 bg-yellow-300 flex flex-row items-center text-orange-800 rounded-full hover:scale-110 hover:shadow-[inset_0px_0px_5px_3px_yellow] hover:text-black-800 focus:outline-none focus:scale-110 focus:border-yellow-500 focus:shadow-[inset_0px_0px_5px_3px_yellow] transition-all ease-in-out duration-300`}
                                >
                                    Remove from Cart
                                </button>
                            )
                            }
                            <button 
                                disabled
                                type="button"
                                className={`px-6 py-2 bg-yellow-500 flex flex-row items-center text-black rounded-full hover:scale-110 hover:shadow-[inset_0px_0px_5px_3px_yellow] hover:text-black-800 focus:outline-none focus:scale-110 focus:border-yellow-500 focus:shadow-[inset_0px_0px_5px_3px_yellow] transition-all ease-in-out duration-300`}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen">
                <h3 className="text-xl text-center font-semibold">User Reviews</h3>
                <div className="min-h-screen flex flex-col justify-center items-center gap-6">
                    <h3 className="text-5xl text-center font-semibold">Coming Soon</h3>
                    <div className="animate-bounce border-4 border-gray-400 bg-white dark:bg-gray-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <h3 className="text-xl text-center font-semibold">Related Searches - "{itemDetails.categoryId ? (itemDetails.categoryId.itemCategoryName):("")}"</h3>
            <div className="min-h-screen flex flex-col justify-center items-center bg-white gap-10 mt-16 p-5 px-5 md:px-32 lg:flex-row ">
                <div className="min-h-screen flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-4 xl:grid xl:grid-cols-4 xl:gap-4">
                    {
                        items
                        .filter((item) => {
                            if (itemDetails.categoryId == undefined ) {
                                return item
                            } else {
                                return item.categoryId._id == itemDetails.categoryId._id
                            }
                        })
                        .map((item, idx) => {
                            return <ItemCard key={idx} item={item} />
                        })
                    
                    }
                </div>
            </div>
        </>
    )
};
