import React from 'react';
import { Input, Logo } from '../index';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
    return (
        <nav className='navbar bg-red-600 pt-10' id='navbar'>
            <div className="container-fluid d-block">
                <div className="row flex items-center" style={{ marginTop: "-2.3rem" }}>
                    <div className="logo-area col-lg-2 col-xl-2 col-4 order-1">
                        <Logo />
                    </div>
                    <div className="search-bar col-lg-5 col-xl-6 m-auto order-lg-2 order-3">
                        <Input
                            type={"search"}
                            placeholder='Search everything at Wallmart online store'
                            className='w-100'
                            style={{ borderRadius: "25px", border: "none", padding: ".8rem 1.2rem" }}
                        />
                    </div>
                    <div className="menu-items col-lg-5 col-xl-4 ms-auto border-green-700 col-8 order-lg-3 order-2">
                        <div className="d-flex align-items-center justify-content-end">
                            <Link to={`/wishlist/${2}`} className="d-flex align-items-center hover:bg-red-700 hover:cursor-pointer py-1 px-2 transition-all duration-200 ease-in-out ms-3">
                                <IoMdHeartEmpty className='text-3xl text-white font-bold' />
                                <div className="info ms-2 text-center">
                                    <h6 className='text-white'>Reorder</h6>
                                    <span className='text-white font-bold font-sans'>My Items</span>
                                </div>
                            </Link>
                            <div className="d-flex align-items-center hover:bg-red-700 hover:cursor-pointer py-1 px-2 transition-all duration-200 ease-in-out  ms-3">
                                <FaRegUser className='text-2xl text-white font-bold' />
                                <div className="info ms-3 text-center">
                                    <h6 className='text-white'>Sign In</h6>
                                    <span className='text-white font-bold font-sans'>Account</span>
                                </div>
                            </div>
                            <Link to={`/cart/${15}`} className="hover:bg-red-700 hover:cursor-pointer py-1 px-3 transition-all duration-200 ease-in-out ms-3">
                                <LuShoppingCart className='text-3xl text-white font-bold m-auto' />
                                <h6 className='text-white mt-1'>Cart</h6>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
