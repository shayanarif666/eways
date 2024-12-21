import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authServices";
import toast, { Toaster } from "react-hot-toast";
import { BackDropLoader } from "../index";

function ProfileSidebar({ onTabChange }) {

    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabChange(newValue);
    };

    // Navigate 
    const navigate = useNavigate();

    // Logout Session
    const handleLogout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            // Notification Msg
            toast.success("Logout Successfull", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "colored"
            });
            // Clear Localstorage Data
            sessionStorage.clear();
            // Navigate
            setTimeout(() => {
                navigate("/");
            }, 2800);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="profile-tabs bg-gray-100 p-2 border border-gray-300">
                {loading && <BackDropLoader />}
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    className="w-full "
                >
                    <Tab label="Account Information" />
                    <Tab label="My Orders" />
                    <Tab label="Order Tracking" />
                    <Tab label="Address Book" />
                </Tabs>
                <div className="text-center mt-2">
                    <button className="text-sm text-gray-600" onClick={handleLogout}>Logout</button>
                </div>
                <Toaster />
            </div>
        </>
    )
}

export default ProfileSidebar
