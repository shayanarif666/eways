import React, { useState } from 'react'
import { TextField, Button, Box, Link } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    // navigate
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/register')
    }

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-lg font-bold mb-5">CUSTOMER LOGIN</h2>

            <div className="row">
                {/* Registered Customers Section */}
                <div className="col-md-6">
                    <h4 className="text-sm font-semibold mb-4">REGISTERED CUSTOMERS</h4>

                    <form className='border p-4'>

                        <p className="mb-4 text-gray-600 text-medium">
                            If you have an account, sign in with your email address.
                        </p>

                        {/* Phone Number */}
                        <Box className="mb-4">
                            <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Email</label>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        {/* Password */}
                        <Box className="mb-4">
                            <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Password</label>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                            />
                        </Box>

                        {/* Sign In Button */}
                        <Box>
                            <button
                                className="bg-blue-500 hover:bg-black transition text-white px-3 py-2 font-medium"
                            >
                                Login Account
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
                </div>

            </div>
        </div>
    )
}

export default Login
