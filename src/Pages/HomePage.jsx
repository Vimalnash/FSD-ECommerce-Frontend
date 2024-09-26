import { Link } from "react-scroll";
import imgWelcome from "../assets/img/welcome.jpg"
import Navbar from "../Components/Navbar";
import { useAppContext } from "../Context/AppContext";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";
import Button from "../Layouts/Button";
import { ItemCard } from "../Components/ItemCard";

// Landing Page Loading view Section
const HomePage = () => {
    const {items, itemCategories} = useAppContext();

    const backgroundColor = "bg-yellow-200"
    const [searchItemName, setSearchItemName] = useState("");
    const [searchItemCategory, setSearchItemCategory] = useState("");

    console.log("itemcatelse", searchItemCategory)

    return (
        <>
            <Navbar />
            <div className="h-14"></div>
            <div className="min-h-96">
                <div className="min-h-96 flex flex-col justify-center items-center gap-10 bg-white border-b-2 border-gray-300 p-5 px-5 md:px-32 lg:flex-row items-center">
                    <div className="flex flex-col gap-4 text-center lg:text-start">
                        <h2 className="text-xl italic md:text-3xl lg:text-5xl font-semibold leading-tight ">
                            Your Dream &nbsp;
                            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                                <span className="relative text-white">Search</span>
                            </span>
                            &nbsp; to Buy Items Ends Here
                        </h2>
                        <p>You will be finding the variety and finest products available.</p>
                        <div className="flex flex-row justify-center lg:justify-start lg:p-5">
                            <Link to="items" spy={true} smooth={true} >
                                <Button title="Search" backgroundColor={backgroundColor} >
                                    <RiSearchLine/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center lg:w-2/4">
                        <img className="" src={imgWelcome} alt="imgWelcome" width={450} height={300}/>
                    </div>
                </div>
            </div>
            <div id="items" className="p-5 flex flex-col justify-between mt-16">
                <h3 className="text-lg italic md:text-xl lg:text-2xl font-semibold text-center">Search for your Favourite Items</h3>
                <div className="flex gap-4 text-sm md:text-lg lg:text-xl font-semibold text-center">
                    <form className="flex gap-2">
                        <div className="flex gap-2">
                            <input
                                className="px-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                                type="text"
                                name="searchItemName"
                                placeholder="ItemName Search"
                                value={searchItemName}
                                onChange={(e) => setSearchItemName(e.target.value)}                        
                            />
                            <select 
                            placeholder="category"
                            className="px-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            value={searchItemCategory}
                            onChange={(e) => setSearchItemCategory(e.target.value)}
                            >
                                <option></option>
                                {
                                    itemCategories.map((val,idx) => {
                                        return <option key={idx} value={val._id}>{val.itemCategoryName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center bg-white gap-10 mt-16 p-5 px-5 md:px-32 lg:flex-row ">
                {
                    typeof(items) == "string" ?
                    (<div>{items}</div>)
                    :
                    (
                    <div className="min-h-screen flex flex-wrap justify-center gap-4 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            searchItemName || searchItemCategory ? 
                            (
                                items
                                .filter((item) => {
                                    if (searchItemName == "") {
                                        return item
                                    } else {
                                        return item.itemName.toLowerCase().substr(0, searchItemName.length) == searchItemName.toLowerCase()
                                    }
                                })
                                
                                .filter((item) => {
                                    if (searchItemCategory == "") {
                                        return item
                                    } else {
                                        console.log("itemcatelse",item.categoryId._id, searchItemCategory)
                                        return item.categoryId._id == searchItemCategory
                                    }
                                })
                                .map((item, idx) => {
                                    return <ItemCard key={idx} item={item} />
                                })
                            )
                            :
                            (
                                items.map((item, idx) => {
                                    return <ItemCard key={idx} item={item} />
                                })
                            )
                        }
                    </div>
                    )
                }
            </div>
        </>
    )
};

export default HomePage;