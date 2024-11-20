import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileSidebar({ onTabChange }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabChange(newValue);
    };

    // Navigate 
    const navigate = useNavigate();

    return (
        <>
            <div className="profile-tabs bg-gray-100 p-2 border border-gray-300">
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
                    <Tab label="Address Book" />
                    <Tab label="My Wishlist" />
                    <Tab label="Logout" onClick={() => navigate("/")} />
                </Tabs>
            </div>
        </>
    )
}

export default ProfileSidebar
