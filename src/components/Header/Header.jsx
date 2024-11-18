import React from 'react'
import { Navbar, NavigationMenus, Slider } from '../index';
import { Route, Routes } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<NavigationMenus />} />
            </Routes>
        </>
    )
}

export default Header
