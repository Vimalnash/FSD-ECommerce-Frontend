import { useFormik } from "formik";
import { useState } from "react";
import { handleResetPassPayload } from "../Helper/auth";
import { resetpasswordSchema } from "../Schemas/resetpassword";
import Navbar from "../Components/Navbar";
import Button from "../Layouts/Button";

// Reset Password Page - Getting Email from the user and send reset link to mail
export function ResetPasswordPage() {
    const backgroundColor = "bg-yellow-100"
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const initVal = {
        email: ""
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
            validationSchema: resetpasswordSchema,
            onSubmit: (values, {resetForm}) => {
                setLoadingMessage(true);
                handleResetPass(values);
                resetForm({values: ""});
            }
        }
    )

    // Reset Password Mail getting from user and sending to backend
    function handleResetPass(resetPasswordPayload) {
        handleResetPassPayload(resetPasswordPayload)
        .then((data) => {
            if (data.error) {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error)
                },1000)
            } else {
                setTimeout(() => {
                    setLoadingMessage(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                },1000)
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center gap-4 bg-white px-5 md:px-32 lg:flex-row bg-gradient ">
                <div className="w-full flex flex-col justify-center items-center gap-2 rounded-xl lg:flex-row">
                    <form className="w-full flex flex-col space-y-5 p-5 rounded-xl lg:w-96 bg-gradient-to-b from-gray-50 to-gray-100 shadow-[0_10px_10px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
                        <div className="rounded-full text-3xl font-semibold text-center">ResetPassword</div>
                        <div className="mb-2 flex flex-col">
                            <label for="email">Email</label>
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
                        <div className="flex flex-col items-center">
                            <Button butType="submit" title="SendEmail" backgroundColor={backgroundColor}/>
                        </div>
                        {
                            loadingMessage && (
                                <h4 className="m-2 text-error">Processing Please Wait...</h4>
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

