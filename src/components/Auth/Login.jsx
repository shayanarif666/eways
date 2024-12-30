import React, { useState } from 'react'
import { TextField, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { DotLoader } from 'react-spinners';
import authService from '../../services/authServices';

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Loading / Error Handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // navigate
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/register');
    }

    // Login Form
    const handleLoginUser = async (data) => {
        setIsLoading(true);
        try {
            const accessToken = await authService.loginUser(data);
            if (accessToken.success) {
                // Notification Msg
                toast.success("Login Successfull", {
                    position: "bottom-right",
                    autoClose: 1500,
                    theme: "colored"
                });
                setIsLoading(false);
                console.log(accessToken);

                // Token aur expiry time ko localStorage mein store karein
                sessionStorage.setItem('user', JSON.stringify(accessToken.res));
                sessionStorage.setItem('token', accessToken.res.token);
                sessionStorage.setItem('expire_at', accessToken.res.expire_at);

                // Token aur expiry time ko localStorage mein store karein
                localStorage.setItem('token', accessToken.res.token);

                // Redirect onto home page
                setTimeout(() => {
                    navigate("/");
                }, 1800);
            } else {
                // Notification Msg
                toast.error("Login Failed", {
                    position: "bottom-right",
                    autoClose: 1500,
                    theme: "colored"
                });
                setIsLoading(false);
                setError(true);
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-lg font-bold mb-5">CUSTOMER LOGIN</h2>

            {error && <p className='text-danger text-sm mb-3'>** Email Not Found</p>}

            <div className="row g-4">
                {/* Registered Customers Section */}
                <div className="col-lg-6 col-12">
                    <h4 className="text-sm font-semibold mb-4">REGISTERED CUSTOMERS</h4>

                    <form className='border p-4' onSubmit={handleSubmit(handleLoginUser)}>

                        <p className="mb-4 text-gray-600 text-medium">
                            If you have an account, sign in with your email address.
                        </p>

                        {/* Phone Number */}
                        <Box className="mb-4">
                            <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Email</label>
                            <TextField
                                label="Email"
                                type='text'
                                variant="outlined"
                                fullWidth
                                {...register("email", {
                                    required: true, pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format",
                                    }
                                })}
                            />
                            {errors.email && <span className='text-sm text-red-600'>** {errors.email.message || "This field required"}</span>}
                        </Box>

                        {/* Password */}
                        <Box className="mb-4">
                            <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Password</label>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-600'>** This field is required</span>}
                        </Box>

                        {/* Sign In Button */}
                        <Box>
                            <button
                                className={`${isLoading ? "opacity-50" : ""} bg-red-800 hover:bg-red-900 transition text-white px-${isLoading ? '5' : '3'} py-2 font-medium`}
                                disabled={isLoading ? true : false}
                            >
                                {isLoading ? <DotLoader size={20} color={"#fff"} /> : 'Login Account'}
                            </button>
                        </Box>
                    </form>
                </div>

                <div className="col-lg-6">
                    <h4 className="text-sm uppercase font-semibold mb-4">New Customers</h4>
                    <div className="border p-4">
                        <p>Creating an account has many benefits: check out faster, keep more than one address, track orders and
                            more.</p>
                        <button onClick={handleNavigate} className='bg-blue-500 hover:bg-black transition text-white px-3 py-2 font-medium mt-4'>Create Account</button>
                    </div>

                    <Toaster />
                </div>

            </div>
        </div>
    )
}

export default Login
