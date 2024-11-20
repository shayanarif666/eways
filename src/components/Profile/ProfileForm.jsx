import React, { useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, Button } from "@mui/material";
import { BsTelephone } from "react-icons/bs";

function ProfileForm({
    isForm,
    setForm,
    isEdit
}) {

    const handleSaveAddress = () => {
        setForm(false);
    }


    useEffect(() => {
        console.log("edit", isEdit)
    }, [])

    return (
        <div className="container mx-auto mt-5  p-4 border">
            <h4 className="mb-4 text-lg font-bold">Contact Information</h4>
            <div className="row mb-4">
                <div className="col-md-6">
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        defaultValue={`${isEdit ? "Muhammad" : ""}`}
                        className="mb-3"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        defaultValue={`${isEdit ? "Shayan" : ""}`}
                        className="mb-3"
                    />
                    <div className="flex items-center mb-3">
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            defaultValue={`${isEdit ? "03162196345" : ""}`}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <h4 className="mb-4 text-lg font-bold">Address</h4>
                    <FormControl fullWidth className="mb-3">
                        <InputLabel>City</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="">
                                <em>Choose a city</em>
                            </MenuItem>
                            <MenuItem value="Karachi">Karachi</MenuItem>
                            <MenuItem value="Lahore">Lahore</MenuItem>
                            <MenuItem value="Islamabad">Islamabad</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Street Address"
                        variant="outlined"
                        className="mb-3"
                    />
                    <FormControl fullWidth className="mb-3">
                        <InputLabel>State/Province</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="">
                                <em>Please select a region, state or province</em>
                            </MenuItem>
                            <MenuItem value="Sindh">Sindh</MenuItem>
                            <MenuItem value="Punjab">Punjab</MenuItem>
                            <MenuItem value="KPK">KPK</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Country"
                        variant="outlined"
                        defaultValue={`${isEdit ? "Pakistan" : ""}`}
                        className="mb-3"
                    />
                </div>
            </div>
            <div className="flex justify-between">
                {
                    isEdit ? <button onClick={handleSaveAddress} className='bg-red-600 hover:bg-red-700 py-2 px-3 text-white font-semibold'>
                        Save Address
                    </button>
                        :
                        <button onClick={handleSaveAddress} className='bg-red-600 hover:bg-red-700 py-2 px-3 text-white font-semibold'>
                            Add Address
                        </button>
                }

            </div>
        </div>
    )
}

export default ProfileForm
