import React from 'react'
import { BottomNavs, Navbar, NavigationMenus } from '../index';
import { Route, Routes } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar />
            <div className='sm:block hidden w-100'>
                <Routes>
                    <Route index element={<NavigationMenus />} />
                </Routes>
            </div>
            <div className='sm:hidden block mt-3 fixed w-100 bottom-0 z-50'>
                <BottomNavs />
            </div>
        </>
    )
}

export default Header
