import * as Yup from "yup";

export const Registervalidator =  Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required").min(6),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("User Name is required"),
    confirm_password: Yup
    .string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
})