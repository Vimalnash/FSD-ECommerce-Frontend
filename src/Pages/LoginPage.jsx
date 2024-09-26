import { useFormik } from "formik";
import { loginSchema } from "../Schemas/login";
import { handleLoginPayload } from "../Helper/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Button from "../Layouts/Button";
import { RiLockPasswordFill, RiMailFill } from "react-icons/ri";

// User Login Page
export function LoginPage() {
    const backgroundColor = "bg-yellow-200"
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initVal = {
        email: "",
        password: ""
    };

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        errors
    } = useFormik(
        {
            initialValues: initVal,
            validationSchema: loginSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                handleLogin(values);
                setTimeout(() => {
                    resetForm({values: ""});
                },500)

            }
        }
    )

    // Handle User Credential Payload
    function handleLogin(loginPayload) {
        handleLoginPayload(loginPayload)
        .then((data) => {
            if(data.error) {
                setLoadingMessage(false);
                setSuccessMessage("");
                setFailureMessage(data.error)
                setTimeout(() => {
                    setFailureMessage("")
                },3000)
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
                setTimeout(() => {
                    navigate("/")
                    location.reload();
                },2000)
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center gap-4 bg-white px-5 md:px-32 lg:flex-row bg-gradient bgimage-login">
                <div className="w-full flex flex-col justify-center items-center gap-2 rounded-xl lg:flex-row">
                    <form className="w-full flex flex-col space-y-5 p-5 rounded-xl lg:w-96 bg-gradient-to-b from-gray-50 to-gray-100 shadow-[0_10px_10px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
                        <h2 className="rounded-full text-3xl font-semibold text-center">
                            Login
                        </h2>
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
                                placeholder="Enter Email"
                            />
                            <div>
                                {
                                    touched.email && errors.email ?
                                    (<div className="p-2 text-red-400">{errors.email}</div>)
                                    :
                                    ("")
                                }
                            </div>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <label for="password" className="flex flex-row items-center gap-2"><RiLockPasswordFill /><span>Password</span></label>
                                <button
                                    className={`text-black rounded-full hover:scale-110 hover:text-yellow-800 focus:text-yellow-800 focus:outline-none focus:scale-110 transition-all ease-in-out duration-300`}
                                    type="button" onClick={() => navigate("/resetpassword")}
                                >
                                    ForgotPassword?
                                </button>
                            </div>
                            <input
                                type="password"
                                className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Passoword"
                            />
                            <div>
                                {
                                    touched.password && errors.password ?
                                    (<div className="p-2 text-red-400">{errors.password}</div>)
                                    :
                                    ("")
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Button butType="submit" title="Login" backgroundColor={backgroundColor}/>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                                <button 
                                    className={`text-black rounded-full hover:scale-110 hover:text-yellow-800 focus:text-yellow-800 focus:outline-none focus:scale-110 transition-all ease-in-out duration-300`}
                                    type="button" onClick={() => navigate("/signup")}
                                >
                                    Not Yet Registered? Register
                                </button>
                        </div>
                        {
                            loadingMessage && (
                                <>
                                    <h4 className="m-2 text-error">
                                        Logging In
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

