import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { userRatingSchema } from "../Schemas/userrating";
import { getToken } from "../Helper/auth";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export function UserRatingForm() {
    const navigate = useNavigate();
    const {loggedInUser} = useAppContext();

    const [showPostMenu, setShowPostMenu] = useState(false);
    const [createPostFormTrue, setCreatePostFormTrue] = useState(false);
    const [viewPostFormTrue, setViewPostFormTrue] = useState(false);
    const [viewPosts, setViewPosts] = useState(false);
    const [viewPostEmail, setViewPostEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [userPostData, setUserPostData] = useState([]);
    const [payloadData, setPayloadData] = useState({
        username: "",
        email: "",
        rating: "",
        comment: ""
    });
    const [show, setShow] = useState(true);
    const [editId, setEditId] = useState();

    useEffect(() => {
        if(loggedInUser.userName) {
            setShowPostMenu(true);
        }
    }, []);

    function createPost() {
        setCreatePostFormTrue(true);
        setViewPostFormTrue(false);
        setShowPostMenu(false);
        setViewPosts(false);
        setPayloadData({
            username: "",
            email: "",
            rating: "",
            comment: ""
        });
        setShow(true);
    };
    
    function viewPost() {
        setCreatePostFormTrue(false);
        setViewPostFormTrue(true);
        setShowPostMenu(false);
        setViewPosts(false)
    };

    function origView() {
        setCreatePostFormTrue(false);
        setViewPostFormTrue(false);
        setViewPosts(false)
        setShowPostMenu(true);
    };

    let initVal = {
        ...payloadData
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initVal,
        validationSchema: userRatingSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                handlePostSubmit(values);
            } else {
                handlePostUpdateSubmit(values)
            }
            resetForm({values: ""});
        }
    });

    async function handlePostSubmit(payload) {
        const res = await fetch(`${baseurl}/${userurl}/userrating/new`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        const data = await res.json();
        if (data.error) {
            setSuccessMessage("");
            setFailureMessage(data.error);
            setTimeout(()=> {
                setFailureMessage("");
            },3000)
        } else {
            setSuccessMessage(data.message);
            setFailureMessage("");
            setTimeout(()=> {
                setSuccessMessage("");
            },2000)
        }
    };

    async function handlePostUpdateSubmit(updatePayload) {
        console.log("update", updatePayload, editId)
        const res = await fetch(`${baseurl}/${userurl}/userrating/update/${editId}`, {
            method: "PUT",
            body: JSON.stringify(updatePayload),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        const data = await res.json();
        // console.log(data);
        if (data.error) {
            setSuccessMessage("");
            setFailureMessage(data.error);
            setTimeout(()=> {
                setFailureMessage("");
            },3000)
        } else {
            setSuccessMessage(data.message);
            setFailureMessage("");
            setShow(true);
            setTimeout(()=> {
                setSuccessMessage("");
            },2000)
        }
    };

    // Getting All Posts for the entered Email
    async function handleViewPosts(e) {
        e.preventDefault();
        const res = await fetch(`${baseurl}/${userurl}/userrating/get?email=${viewPostEmail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        const data = await res.json();
        // console.log(data);
        if (data.error) {
            setSuccessMessage("");
            setViewPosts(true);
            setFailureMessage(data.error);
            setTimeout(()=> {
                setFailureMessage("");
            },3000)
        } else {
            setUserPostData(data.data);
            setViewPostFormTrue(false);
            setViewPosts(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-5 lg:px-32 lg:flex-row bg-gradient-to-b from-base-200 to-base-50">
            <div className="w-full flex flex-col justify-center items-center gap-2 rounded-xl lg:flex-row">
                <div className="w-64 h-[480px] pt-4 pb-4 bg-gradient-to-b from-base-200 to-base-50 tracking-wide shadow">
                    
                    
                    {
                        loggedInUser.userName ? 
                        (
                            showPostMenu &&
                            <div className="flex flex-col justify-center items-center gap-2 text-center">
                                <h3 className="text-2xl text-center">Mobile App Model</h3>
                                <h3 className="text-center">Your Opinions are Welcome {loggedInUser.userName} !</h3>
                                <button className="btn btn-sm btn-accent" onClick={createPost} >Create Your Post</button>
                                <button className="btn btn-sm btn-accent" onClick={viewPost} >View Your Posts</button>
                            </div>
                        )
                        :
                        (
                            <div>
                                <button className="btn btn-sm btn-accent" onClick={() => navigate("/login")} >Login</button>
                            </div>
                        )
                    }
                    {
                        createPostFormTrue && 
                            <div className="" >
                                <h3 className="mb-2 text-2xl text-center">Mobile App Model</h3>
                                <div className="h-8 bg-gradient-to-b from-teal-100 to-teal-800">
                                    <button 
                                        onClick={origView}
                                        className="text-slate-800"
                                    >
                                        &larr; GoBack
                                    </button>
                                </div>
                                <div className="p-2 h-80 overflow-y-scroll overflow-x-hidden">
                                <form className="flex flex-col justify-start items-center gap-2" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <label for="username">Name</label>
                                        <input
                                            required
                                            type="text" 
                                            id="username" 
                                            className="border-2" 
                                            value={values.username} 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.username && errors.username ?
                                            (<div className="pl-2 text-error">{errors.username}</div>)
                                            :
                                            ("")
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <label for="email">Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            id="email" 
                                            className="border-2"
                                            value={values.email} 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.email && errors.email ?
                                            (<div className="text-error">{errors.email}</div>)
                                            :
                                            ("")
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <label for="rating">Rating</label>
                                        <select 
                                            required
                                            type="select" 
                                            id="rating" 
                                            className="w-48 border-2"
                                            value={values.rating} 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option></option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                        {
                                            touched.rating && errors.rating ?
                                            (<div className="text-error">{errors.rating}</div>)
                                            :
                                            ("")
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <label for="comment">Comments</label>
                                        <textarea 
                                            required
                                            type="text" 
                                            id="comment" 
                                            className="border-2" 
                                            value={values.comment} 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></textarea>
                                        {
                                            touched.comment && errors.comment ?
                                            (<div className="text-error">{errors.comment}</div>)
                                            :
                                            ("")
                                        }
                                    </div>
                                    {
                                        show ?
                                        (<button type="submit" className="btn btn-accent">Post New</button>)
                                        :
                                        (<button type="submit" className="btn btn-accent">Update</button>)
                                    }
                                </form>
                                </div>
                            </div>
                    }
                    {
                        viewPostFormTrue && 
                            <div className="">
                                <h3 className="mb-2 text-2xl text-center">Mobile App Model</h3>
                                <div className="h-8 bg-gradient-to-b from-teal-100 to-teal-800">
                                    <button 
                                        onClick={origView}
                                        className="text-slate-800"
                                    >
                                        &larr; GoBack
                                    </button>
                                </div>
                                <div className="p-2 h-80 overflow-y-scroll overflow-x-hidden">
                                <form className="flex flex-col justify-start items-center gap-2" onSubmit={(e) => handleViewPosts(e)}>
                                    <div className="flex flex-col">
                                        <label for="email">Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            id="email" 
                                            className="border-2"
                                            value={viewPostEmail} 
                                            onChange={(e) => {setViewPostEmail(e.target.value)}}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-accent">View Posts</button>
                                </form>
                                </div>
                            </div>
                    }
                    {
                        viewPosts && 
                            <div className="">
                                <h3 className="mb-2 text-2xl text-center">Mobile App Model</h3>
                                <div className="h-8 bg-gradient-to-b from-teal-100 to-teal-800">
                                    <button 
                                        onClick={origView}
                                        className="text-slate-800"
                                    >
                                        &larr; GoBack
                                    </button>
                                    
                                </div>
                                <div className="w-full bg-blue-200 overflow-x-hidden">
                                    <span className="ani-scroll p-2 text-slate-800">Showing Result for {viewPostEmail}</span>
                                </div>
                                <div className="p-2 h-64 overflow-y-scroll overflow-x-hidden">
                                    <div className="flex flex-wrap gap-2">
                                    {
                                        userPostData.length > 0 ?
                                        (
                                            userPostData.map((postData, index) => {
                                                return <UserPostCard 
                                                    key={postData._id} 
                                                    postData={postData}  
                                                    setPayloadData={setPayloadData}
                                                    setCreatePostFormTrue={setCreatePostFormTrue}
                                                    setViewPostFormTrue={setViewPostFormTrue}
                                                    setShowPostMenu={setShowPostMenu}
                                                    setViewPosts={setViewPosts}
                                                    setShow={setShow}
                                                    setEditId={setEditId}
                                                />
                                            })
                                        )
                                        :
                                        (<div className="text-error">{failureMessage}</div>)
                                    }
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        successMessage ?
                        (<div className="text-success text-center">{successMessage}</div>):("")
                    }
                    {
                        failureMessage ?
                        (<div className="text-error  text-center">{failureMessage}</div>):("")
                    }
                    
                </div>
            </div>
        </div>
    )
};

function UserPostCard({postData, setPayloadData, setCreatePostFormTrue, setViewPostFormTrue, setShowPostMenu, setViewPosts, setShow, setEditId}) {

    async function editPost(e) {
        // e.preventDefault();
        setViewPostFormTrue(false);
        setShowPostMenu(false);
        setViewPosts(false);
        setShow(false);
        setEditId(postData._id);
        setPayloadData({
            username: postData.username,
            email: postData.email,
            rating: postData.rating,
            comment: postData.comment,
        });
        setCreatePostFormTrue(true);
    }

    async function delPost(e) {
        e.preventDefault();
        const parent = e.target.parentNode.parentNode
        // console.log(parent, postData._id)
        const delConfirm = confirm("Do you wish to Delete?")
        if (delConfirm) {
            const res = await fetch(`${baseurl}/${userurl}/userrating/delete/${postData._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            const data = await res.json();
            if (data.error) {
                alert("Cannot delete-Try After Sometime");
            } else {
                alert("Deleted Successfully");
                parent.remove();
            }
        } else {
            alert ("Post Not Deleted")
        }
    }
    return (
        <div className="w-full p-2 border-2 border-accent">
            <p>{postData.rating} Star</p>
            <p>{postData.comment}</p>
            <div className="flex justify-center gap-2">
                <button className="btn btn-sm bg-teal-600 text-white hover:bg-teal-800" onClick={(e) => editPost(e, )}>Edit</button>
                <button className="btn btn-sm bg-red-700 text-white  hover:bg-red-900"  onClick={(e) => delPost(e, )}>Del</button>
            </div>
        </div>
    )
}