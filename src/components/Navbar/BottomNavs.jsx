import React, { useState } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FaHome, FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoIosCart } from "react-icons/io";
import "./navbar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';

function BottomNavs() {
    const [value, setValue] = useState(0);

    // Navigate
    const navigate = useNavigate();

    // Redirect pages
    const handleRedirect = (endPoint) => {
        navigate(endPoint);
    }

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                className='shadow'
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    onClick={() => handleRedirect("/")}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    label='Home'
                    icon={<FaHome />}
                />
                <BottomNavigationAction
                    onClick={() => handleRedirect(`/cart/${15}`)}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    label='Cart' icon={<IoIosCart />}
                />
                <BottomNavigationAction
                    onClick={() => handleRedirect(`/profile/${2}`)}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    label='Profile' icon={<FaRegUser />}
                />
                <BottomNavigationAction
                    onClick={() => handleRedirect(`/categories`)}
                    label='Categories'
                    icon={<BiCategory />}
                />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNavs
