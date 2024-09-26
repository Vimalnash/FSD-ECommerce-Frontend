import * as yup from "yup";

export const userRatingSchema = yup.object({
    username: yup.string().required("UserName Is Required"),
    email: yup.string().email("Enter Valid email").required("Email is Required"),
    rating: yup.number().required("Required"),
    comment: yup.string().required("Min 10 Characters Required")
});
