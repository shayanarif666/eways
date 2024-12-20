import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import authService from '../../services/authServices';
import { DotLoader } from 'react-spinners';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Loading / Error Handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Register Form
    const handleRegisterUser = async (data) => {
        setIsLoading(true);
        try {
            const createUser = await authService.registerUser(data)
            // Notification Msg
            toast.success("Registration Successfull", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            setIsLoading(false);
            setError(false);
            console.log(createUser)
        } catch (error) {
            console.log(error.message); // Handle any errors
            setIsLoading(false);
            setError(true);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg font-bold mb-5">CREATE NEW CUSTOMER ACCOUNT</h2>

            {error && <p className='text-danger text-sm mb-3'>** Already Registered</p>}

            <form onSubmit={handleSubmit(handleRegisterUser)}>
                <div className="row border p-4">
                    {/* Personal Information */}
                    <div className="col-md-6 pr-4">
                        <h4 className="text-md font-medium mb-5">PERSONAL INFORMATION</h4>

                        {/* First Name */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>First Name</label>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                            {...register("first_name", { required: true })}
                        />
                        {errors.first_name && <span className='text-sm text-red-600 mb-4 block'>** This field is required</span>}

                        {/* Last Name */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Last Name</label>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                            {...register("last_name", { required: true })}
                        />
                        {errors.last_name && <span className='text-sm text-red-600 mb-4 block'>** This field is required</span>}

                    </div>

                    {/* Sign-In Information */}
                    <div className="col-md-6 pl-4">
                        <h4 className="text-md font-medium mb-5">SIGN-IN INFORMATION</h4>

                        {/* Username */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Email</label>
                        <TextField
                            label="Email"
                            type='email'
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                            {...register("email", { required: true, pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                              }, })}
                        />
                        {errors.email && <span className='text-sm text-red-600 mb-4 block'>** {errors.email.message || "This field required"}</span>}

                        {/* Password */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Password</label>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className='text-sm text-red-600 mb-4 block'>** This field is required</span>}

                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <p className='text-gray-600 text-sm mb-3'>Already Have An Account Please <Link to={`/login`} className='text-blue-400 underline
                    '>Login</Link></p>
                        <button
                            className={`${isLoading ? "opacity-50" : ""} bg-red-800 hover:bg-red-900 transition text-white px-${isLoading ? '5' : '3'} py-2 font-medium`}
                            disabled={isLoading ? true : false}
                        >
                            {isLoading ? <DotLoader size={20} color={"#fff"} /> : 'Register Account'}
                        </button>
                    </div>

                    <Toaster />

                </div>
            </form>

        </div>
    )
}

export default Register;
