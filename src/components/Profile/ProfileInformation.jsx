import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const ProfileInformation = () => {

    const { register, handleSubmit } = useForm();

    // Loading / Error Handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // Get Credentials From Store
    const { token, userData } = useSelector((state) => state.auth);
    const updatedUser = JSON.parse(localStorage.getItem("updatedUser")) || false;

    // Update Profile
    const handleUpdateProfile = async (data) => {
        console.log(data)
        setIsLoading(true);
        try {
            const updateData = {
                ...data,
                dOb: "string",
                height: "string",
                user_id: 0
            }
            const updateUser = await authService.updateProfile(updateData, token);
            setIsLoading(false);
            setError(false);
            // Notification Msg
            toast.success("Updated Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            console.log("updateUser ===>", updateUser)
        } catch (error) {
            console.log("Error", error);
            setError(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="">

            {error && <p className="text-danger text-sm mb-3">** Something went wrong</p>}

            <form className="p-4 border" onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="name md:flex items-center justify-between">
                    {/* First Name */}
                    <div className="w-full me-3">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">First Name</label>
                        <TextField
                            label="Last Name"
                            fullWidth
                            defaultValue={updatedUser ? updatedUser.first_name : userData.first_name}
                            className="mb-4"
                            {...register("firstName", { required: true })}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">Last Name</label>
                        {/* Last Name */}
                        <TextField
                            label="Last Name"
                            fullWidth
                            defaultValue={updatedUser ? updatedUser.last_name : userData.last_name}
                            className="mb-4"
                            {...register("lastName", { required: true })}
                        />
                    </div>
                </div>

                <div className="name md:flex items-center justify-between">
                    <div className="w-full me-3">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">Email</label>
                        {/* Last Name */}
                        <TextField
                            label="Email"
                            fullWidth
                            defaultValue={updatedUser ? updatedUser.userName : userData.user_name}
                            className="mb-4"
                            {...register("username", { required: true })}
                        />
                    </div>
                    {/* Gender */}
                    <div className="w-full me-3">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">Gender</label>
                        <TextField
                            select
                            label="Gender"
                            fullWidth
                            className="mb-4"
                            defaultValue={updatedUser ? updatedUser.gender : userData.gender}
                            {...register("gender", { required: true })}
                        >
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                            <MenuItem value={3}>Others</MenuItem>
                        </TextField>
                    </div>
                </div>

                <div className="name md:flex items-center justify-between">
                    {/* City */}
                    <div className="w-full me-3">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">City</label>
                        <TextField
                            label="City"
                            fullWidth
                            defaultValue={updatedUser ? updatedUser.city : userData.city}
                            className="mb-4"
                            {...register("city", { required: true })}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-3">Zip</label>
                        {/* Zip */}
                        <TextField
                            label="Zip"
                            fullWidth
                            defaultValue={updatedUser ? updatedUser.zip : userData.zip}
                            className="mb-4"
                            {...register("zip", { required: true })}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        className={`${isLoading ? "opacity-50" : ""} bg-red-800 hover:bg-red-900 transition text-white px-${isLoading ? '5' : '3'} py-2 font-medium`}
                        disabled={isLoading ? true : false}
                    >
                        {isLoading ? <DotLoader size={20} color={"#fff"} /> : 'Save'}
                    </button>
                </div>

                <Toaster />

            </form>
        </div>
    )
}

export default ProfileInformation
