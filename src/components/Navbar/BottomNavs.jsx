import React, { useEffect, useState } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FaHome, FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoIosCart } from "react-icons/io";
import "./navbar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';

function BottomNavs() {
    const [value, setValue] = useState("home");

    // Navigate
    const navigate = useNavigate();

    // Set the initial value based on the current path
    useEffect(() => {
        if (location.pathname === `/profile/${2}`) {
            setValue("profile");
        } else if (location.pathname === "/categories") {
            setValue("categories");
        } else if (location.pathname === `/cart/${15}`) {
            setValue("cart");
        } else {
            setValue("home");
        }
    }, [location.pathname]);

    const changePath = (path) => {
        navigate(path);
    };


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
                    onClick={() => changePath("/")}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    label='home'
                    value="home"
                    icon={<FaHome />}
                />
                <BottomNavigationAction
                    onClick={() => changePath(`/cart/${15}`)}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    value="cart"
                    label='cart' icon={<IoIosCart />}
                />
                <BottomNavigationAction
                    onClick={() => changePath(`/profile/${2}`)}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    value="profile"
                    label='profile' icon={<FaRegUser />}
                />
                <BottomNavigationAction
                    onClick={() => changePath(`/categories`)}
                    className='bottom-nav'
                    sx={{ fontSize: "20px" }}
                    label='categories'
                    value="categories"
                    icon={<BiCategory />}
                />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNavs
