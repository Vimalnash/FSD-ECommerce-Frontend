import {useFormik} from "formik";
import { registerSchema } from "../Schemas/register";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleRegisterPayload } from "../Helper/auth";
import Navbar from "../Components/Navbar";
import Button from "../Layouts/Button";
import { RiAccountBoxFill, RiAccountBoxLine, RiAccountCircleFill, RiLockPasswordFill, RiMailAddFill, RiMailFill, RiRecordMailFill } from "react-icons/ri";

// New User Signup Page
export function RegisterPage() {
    const backgroundColor = "bg-yellow-200"
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initvalue = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
    } = useFormik(
        {
            initialValues: initvalue,
            validationSchema: registerSchema,
            onSubmit: (values,  {resetForm}) => {
                setLoadingMessage(true);
                setTimeout(() => {
                    handleRegister(values);
                    resetForm({values: ""});
                },2000)
            }
        }
    )

    // Handle Register payload
    function handleRegister(registerPayload) {
        handleRegisterPayload(registerPayload)
        .then((data) => {
            if(data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
                setTimeout(() => {
                    setFailureMessage("");
                },3000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
            }
        })
    };

    
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center gap-4 bg-white px-5 md:px-32 lg:flex-row bg-gradient bgimage-register">
            <div className="w-full flex flex-col justify-center items-center gap-2 rounded-xl lg:flex-row">
                <form className="w-full flex flex-col space-y-5 p-5 rounded-xl lg:w-96 bg-gradient-to-b from-gray-50 to-gray-100 shadow-[0_10px_10px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
                    <div className="rounded-full text-3xl font-semibold text-center">Register</div>
                    <div className="mb-2 flex flex-col">
                        <label for="email" className="flex flex-row items-center gap-2"><RiAccountBoxLine /><span>FirstName</span></label>
                        <input
                            type="text"
                            className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            id="firstName"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            {
                                touched.firstName && errors.firstName ?
                                (<div className="p-2 text-error">{errors.firstName}</div>)
                                :
                                ("")
                            }
                        </div>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label for="email" className="flex flex-row items-center gap-2"><RiAccountCircleFill /><span>LastName</span></label>
                        <input
                            type="text"
                            className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            {
                                touched.lastName && errors.lastName ?
                                (<div className="p-2 text-error">{errors.lastName}</div>)
                                :
                                ("")
                            }
                        </div>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label for="email" className="flex flex-row items-center gap-2"><RiAccountBoxFill /><span>UserName</span></label>
                        <input
                            type="text"
                            className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            id="userName"
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            {
                                touched.userName && errors.userName ?
                                (<div className="p-2 text-error">{errors.userName}</div>)
                                :
                                ("")
                            }
                        </div>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label for="email" className="flex flex-row items-center gap-2"><RiMailFill /><span>Email</span></label>
                        <input
                            type="email"
                            className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            {
                                touched.email && errors.email ?
                                (<div className="p-2 text-error">{errors.email}</div>)
                                :
                                ("")
                            }
                        </div>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label for="email" className="flex flex-row items-center gap-2"><RiLockPasswordFill /><span>Password</span></label>
                        <input
                            type="password"
                            className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            {
                                touched.password && errors.password ?
                                (<div className="p-2 text-error">{errors.password}</div>)
                                :
                                ("")
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <Button butType="submit" title="Register" backgroundColor={backgroundColor}/>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                            <button 
                                className={`text-black rounded-full hover:scale-110 hover:text-yellow-800 focus:text-yellow-800 focus:outline-none focus:scale-110 transition-all ease-in-out duration-300`}
                                type="button" onClick={() => navigate("/login")}
                            >
                                Already Registered? Login
                            </button>
                    </div>
                    {
                        loadingMessage && (
                            <>
                                <h4 className="m-2 text-error">
                                    Processing Please Wait
                                </h4>
                                <span className="m-2 text-error loading loading-dots loading-md"></span>
                            </>
                        )
                    }
                    {successMessage ? (<h4 className="m-2 text-success">{successMessage}</h4>):("")}
                    {failureMessage ? (<h4 className="m-2 text-error">{failureMessage}</h4>):("")}
                </form>
            </div>
            </div>
        </>
    )
};

