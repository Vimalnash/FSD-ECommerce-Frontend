import { useFormik } from "formik";
import { newpasswordSchema } from "../Schemas/newpassword";
import { handleNewPasswordPayload } from "../Helper/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Layouts/Button";
import Navbar from "../Components/Navbar";

// New Password setting Page
export function NewPasswordSetPage() {
    const backgroundColor = "bg-yellow-100"
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const location = useLocation();
    const passwordResetToken = new URLSearchParams(location.search).get("auth")

    const initVal = {
        password: "",
        confirmPassword: ""
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
            validationSchema: newpasswordSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                setTimeout(() => {
                    handleNewPassword(values);
                    resetForm({values: ""});
                },2000)
            }
        }
    )

    // New User Password Payload handling
    function handleNewPassword(newPasswordPayload) {
        handleNewPasswordPayload(newPasswordPayload, passwordResetToken)
        .then((data) => {
            if (data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
                setTimeout(() => {
                    setFailureMessage("")
                },3000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
                setTimeout(() => {
                    navigate("/login")
                },3000)
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center gap-4 bg-white px-5 md:px-32 lg:flex-row bg-gradient ">
            <div className="w-full flex flex-col justify-center items-center gap-2 rounded-xl lg:flex-row">
                <form className="w-full flex flex-col space-y-5 p-5 rounded-xl lg:w-96 bg-gradient-to-b from-gray-50 to-gray-100 shadow-[0_10px_10px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
                    <div className="rounded-full text-3xl font-semibold text-center">NewPassword</div>
                    <div className="mb-2 flex flex-col">
                    <label for="password">Password</label>
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
                <div className="mb-2 flex flex-col">
                    <label for="confirmPassword">ConfirmPassword</label>
                    <input
                        type="password"
                        className="p-2 border-2 border-gray-300 rounded-lg hover:shadow-[0_10px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:border-gray-500 focus:shadow-[inset_0px_0px_5px_3px_gray] transition-all duration-300"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div>
                        {
                            touched.confirmPassword && errors.confirmPassword ?
                            (<div className="p-2 text-error">{errors.confirmPassword}</div>)
                            :
                            ("")
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Button butType="submit" title="SetNewPassword" backgroundColor={backgroundColor}/>
                </div>
                {
                    loadingMessage && (
                        <>
                            <h4 className="m-2 text-error">Processing Please Wait</h4>
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

