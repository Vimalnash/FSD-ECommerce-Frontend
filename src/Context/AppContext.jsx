import { createContext, useContext, useEffect, useState } from "react";
import { isAdminLoggedIn, isUserLoggedIn } from "../Helper/auth";
import { allurl, baseurl } from "../Handlers/BackendUrls";

// Creating New Context
const AppCtx = createContext(null);

// Applying Context
export function AppContext({children}) {
    const [theme, setTheme] = useState("cupcake");
    const [loggedInUser, setLoggedInUser] = useState({});
    const [LoadingTrue, setLoadingTrue] = useState(true);
    const [items, setItems] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [itemUoms, setItemUoms] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Getting All Items
    useEffect(() => {
        fetch(`${baseurl}/${allurl}/get/items`)
        .then((res) => res.json())
        .then((data) => {
            console.log("items", data);
            if(data.error) {
                // console.log(data.error);
                setItems(data.error);
            } else {
                setItems(data.data);
            }
        })
    }, []);

    // Getting All ItemCategories
    useEffect(() => {
        fetch(`${baseurl}/${allurl}/get/items/itemcategories`)
        .then((res) => res.json())
        .then((data) => {
            console.log("itemCategory", data);
            if(data.error) {
                // console.log("itemcateg", data.error);
                setItemCategories(data.error);
            } else {
                setItemCategories(data.data);
            }
        })
    }, []);
    
    // Getting All ItemUoms
    useEffect(() => {
        fetch(`${baseurl}/${allurl}/get/items/itemuoms`)
        .then((res) => res.json())
        .then((data) => {
            console.log("uoms", data);
            if(data.error) {
                // console.log("uoms", data.error);
                setItemUoms(data.error);
            } else {
                setItemUoms(data.data);
            }
        })
    }, []);

        

    // Getting is normal user logged in
    const userAccess = isUserLoggedIn();
    if (userAccess) {
        // checking, getting and setting logged in user
        useEffect(() => {
            setLoggedInUser(JSON.parse(localStorage.getItem("user")));
        },[]);
    };
    // getting is admin logged in
    const adminAccess = isAdminLoggedIn();
    if (adminAccess) {
        // Checking, getting and setting the loggedin username
        useEffect(() => {
            setLoggedInUser(JSON.parse(localStorage.getItem("user")));
        },[]);
    };

    const [ currentDate, setCurrentDate ] = useState("");
    useEffect(() => {
        setCurrentDate(new Date().toJSON().slice(0, 10));
    },[])

    return (
        <AppCtx.Provider value={{
            theme, setTheme,
            loggedInUser, setLoggedInUser,
            currentDate, setCurrentDate,
            LoadingTrue, setLoadingTrue,
            items, setItems,
            itemCategories, setItemCategories,
            itemUoms, setItemUoms,
            cartCount, setCartCount
        }}>
            {children}
        </AppCtx.Provider>
    )
};

// UseContext Function to get the context vairables
export function useAppContext() {
    return useContext(AppCtx)
}