import React, { useCallback, useEffect, useState } from 'react';
import { Input, Logo, SearchResults } from '../index';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
import productService from '../../services/productService';
import { useSelector } from 'react-redux';
import cartService from '../../services/cartService';

function Navbar() {

    // Get User
    const { userData, token } = useSelector((state) => state.auth) || null;

    // State Variables
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [update, setUpdate] = useState(false);

    // Navigate User
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
            const { resp } = await productService.getSearchProducts(searchValue);
            setSearchProducts(resp);
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

    // Get Carts Length
    const fetchCartData = async () => {
        try {
            const carts = await cartService.getCart(token) || {};
            setCart(carts);
            setUpdate(!update)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCartData();
    }, [update])

    return (
        <nav className='navbar pt-10' id='navbar'>
            <div className="xl:container container-fluid d-block">
                <div className="row flex items-center" style={{ marginTop: "-2.3rem" }}>
                    <div className="logo-area col-lg-2 col-xl-2 col-sm-4 col-6 order-1">
                        <Logo filter="brightness(0) invert(1)" />
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
                    <div className="menu-items col-lg-5 col-xl-4 ms-auto border-green-700 col-6 order-lg-3 order-2 sm:block">
                        <div className="d-flex align-items-center justify-content-end">
                            <Link to={`/wishlist/${2}`} className="d-flex align-items-center rounded-full hover:cursor-pointer py-1 sm:px-2 transition-all duration-200 ease-in-out">
                                <IoMdHeartEmpty className='sm:text-3xl text-2xl text-white font-bold me-2' />
                                <div className="info text-center sm:block hidden">
                                    <h6 className='text-white'>Reorder</h6>
                                    <span className='text-white font-bold font-sans'>My Items</span>
                                </div>
                            </Link>
                            <Link to={`${token ? "/profile/2" : "/login"}`} className="md:mx-6 d-flex align-items-center rounded-full hover:cursor-pointer py-1 sm:px-2 transition-all duration-200 ease-in-out">
                                <FaRegUser className='sm:text-2xl text-xl text-white font-bold me-2' />
                                <div className="info text-center sm:block hidden">
                                    <h6 className='text-white'>{token ? `${userData.first_name}` : "Sign In"}</h6>
                                    <span className='text-white font-bold font-sans'>Account</span>
                                </div>
                            </Link>
                            <Link to={`/cart/${15}`} className="hover:cursor-pointer py-1 sm:px-2 rounded-full transition-all duration-200 ease-in-out">
                                <button className='relative'>
                                    <LuShoppingCart className='sm:text-3xl text-2xl text-white font-bold m-auto mt-1' />
                                    {
                                        token ?
                                            <span
                                                class="font-extrabold position-absolute top-0 start-100 translate-middle p-2.5 bg-white w-1 h-1 flex items-center justify-center rounded-full text-red-700 text-xs"
                                                style={{ paddingBottom: "-2rem" }}
                                            >
                                                {cart.length || 0} 
                                            </span>
                                            :
                                            <></>
                                    }

                                </button>
                                <h6 className='text-white mt-1 sm:block hidden'>Cart</h6>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
