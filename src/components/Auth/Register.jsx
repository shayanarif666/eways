import React from 'react';
import { TextField, MenuItem, Checkbox, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg font-bold mb-5">CREATE NEW CUSTOMER ACCOUNT</h2>
            <div className="row border p-4">
                {/* Personal Information */}
                <div className="col-md-6 pr-4">
                    <h4 className="text-md font-medium mb-5">PERSONAL INFORMATION</h4>
                    <form>
                        {/* First Name */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>First Name</label>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                        {/* Last Name */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Last Name</label>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                        {/* Date of Birth */}
                        <div className="flex gap-3 mb-4">
                            <div className='w-100'>
                                <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Month</label>
                                <TextField
                                    label="MM"
                                    variant="outlined"
                                    fullWidth
                                    select
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <MenuItem key={i} value={i + 1}>
                                            {i + 1}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='w-100'>
                                <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Day</label>
                                <TextField
                                    label="DD"
                                    variant="outlined"
                                    fullWidth
                                    select
                                >
                                    {[...Array(31)].map((_, i) => (
                                        <MenuItem key={i} value={i + 1}>
                                            {i + 1}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='w-100'>
                                <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Year</label>
                                <TextField
                                    label="YYYY"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Gender</label>
                        <TextField
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            select
                            className="mb-4"
                        >
                            {['Male', 'Female', 'Other'].map((gender, index) => (
                                <MenuItem key={index} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </TextField>

                    </form>
                </div>

                {/* Sign-In Information */}
                <div className="col-md-6 pl-4">
                    <h4 className="text-md font-medium mb-5">SIGN-IN INFORMATION</h4>
                    <form>
                        {/* Phone Number */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Phone Number</label>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                        {/* Email */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Email</label>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                        {/* Password */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Password</label>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                        {/* Confirm Password */}
                        <label htmlFor="" className='mb-2 text-gray-500 text-sm'>Confrim Password</label>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />

                    </form>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <p className='text-gray-600 text-sm mb-3'>Already Have An Account Please <Link to={`/login`} className='text-blue-400 underline
                    '>Login</Link></p>
                    <button
                        className='bg-red-800 hover:bg-red-900 px-3 py-2 text-white font-semibold'
                    >
                        Create an Account
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Register
