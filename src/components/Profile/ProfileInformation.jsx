import React, { useState } from "react";
import { TextField, Button, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

const ProfileInformation = () => {
    return (
        <div className="">
            <form className="p-4 border">
                <div className="name md:flex items-center justify-between">
                    {/* First Name */}
                    <div className="w-full me-3">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-2">First Name</label>
                        <TextField
                            label="First Name"
                            fullWidth
                            className="mb-4"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-2">Last Name</label>
                        {/* Last Name */}
                        <TextField
                            label="Last Name"
                            fullWidth
                            className="mb-4"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-4 flex gap-4">

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-2">Month</label>
                        <TextField
                            select
                            label="MM"
                            fullWidth
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                    {i + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-2">Day</label>
                        <TextField
                            select
                            label="DD"
                            fullWidth
                        >
                            {Array.from({ length: 31 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                    {i + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-2">Year</label>
                        <TextField
                            select
                            label="YYYY"
                            fullWidth
                        >
                            {Array.from({ length: 100 }, (_, i) => (
                                <MenuItem key={2024 - i} value={2024 - i}>
                                    {2024 - i}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>

                {/* Gender */}
                <label htmlFor="" className="font-semibold text-gray-600 mb-2">Gender</label>
                <TextField
                    select
                    label="Gender"
                    fullWidth
                    className="mb-4"
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </TextField>

                {/* Phone Number */}
                <label htmlFor="" className="font-semibold text-gray-600 mb-2">Phone Number</label>
                <TextField
                    label="Phone Number"
                    fullWidth
                    className="mb-4"
                />

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className="hover:bg-red-700 bg-red-600 py-2 px-3 font-semibold text-white">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileInformation
