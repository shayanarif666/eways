import React, { useCallback, useEffect, useState } from 'react';
import { Input, Logo, SearchResults } from '../index';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
import productService from '../../services/productService';

function Navbar() {

    // State Variables
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);

    const navigate = useNavigate();


    // Debounce function to delay execution
    const debounceFunction = useCallback((callback, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }, []);

    // Get All Search Results
    const getAllSearchResults = async (searchValue) => {
        if (!searchValue) {
            setSearchProducts([]);
            return;
        }

        try {
            const { products } = await productService.getSearchProducts(searchValue);
            setSearchProducts(products);
        } catch (error) {
            console.log(error);
        }
    };

    // Debounced version of getAllSearchResults
    const debouncedSearch = useCallback(
        debounceFunction(getAllSearchResults, 500), // Delay of 1 second
        []
    );

    // Handle input change
    const handleSearchResults = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        debouncedSearch(searchValue);
    };

    return (
        <nav className='navbar pt-10' id='navbar'>
            <div className="container d-block">
                <div className="row flex items-center" style={{ marginTop: "-2.3rem" }}>
                    <div className="logo-area col-lg-2 col-xl-2 col-4 order-1 m-auto">
                        <Logo />
                    </div>
                    <div className="search-bar col-lg-5 col-xl-6 m-auto order-lg-2 order-3 sm:py-0 py-2">
                        <Input
                            type={"search"}
                            placeholder='Search everything at Eways'
                            className='w-100'
                            onChangeValue={(e) => handleSearchResults(e)}
                            value={search}
                            style={{ borderRadius: "25px", border: "none", padding: ".8rem 1.2rem" }}
                        />
                        <div className={`search-results ${searchProducts.length > 0 ? "d-block" : "d-none"}`}>
                            <SearchResults updateSearch={setSearch} searchValue={search} products={searchProducts} />
                        </div>
                    </div>
                    <div className="menu-items col-lg-5 col-xl-4 ms-auto border-green-700 col-8 order-lg-3 order-2 sm:block hidden">
                        <div className="d-flex align-items-center justify-content-end">
                            <Link to={`/wishlist/${2}`} className="d-flex align-items-center rounded-full hover:cursor-pointer py-1 px-2 transition-all duration-200 ease-in-out">
                                <IoMdHeartEmpty className='text-3xl text-white font-bold me-2' />
                                <div className="info text-center md:block hidden">
                                    <h6 className='text-white'>Reorder</h6>
                                    <span className='text-white font-bold font-sans'>My Items</span>
                                </div>
                            </Link>
                            <Link to={`/profile/2`} className="md:mx-6 d-flex align-items-center rounded-full hover:cursor-pointer py-1 px-2 transition-all duration-200 ease-in-out">
                                <FaRegUser className='text-2xl text-white font-bold me-2' />
                                <div className="info text-center md:block hidden">
                                    <h6 className='text-white'>Sign In</h6>
                                    <span className='text-white font-bold font-sans'>Account</span>
                                </div>
                            </Link>
                            <Link to={`/cart/${15}`} className="hover:cursor-pointer py-1 px-2 rounded-full transition-all duration-200 ease-in-out">
                                <LuShoppingCart className='text-3xl text-white font-bold m-auto me-2' />
                                <h6 className='text-white mt-1 md:block hidden'>Cart</h6>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
