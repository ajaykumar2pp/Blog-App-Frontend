import * as Yup from 'yup'
export const validationRegisterSchema = Yup.object({
    username: Yup.string().min(2, 'Minimum 2 letters').max(50, 'Too long').matches(/^[a-zA-Z\s]+$/, 'Username must contain only letters').required("Name is required"),
    email: Yup.string().email('Invalid email format').required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})