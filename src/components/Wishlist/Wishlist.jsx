import React, { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { BackDropLoader, WishlistItems } from '../index';
import { items } from "./fakeItems"
import favouritesService from '../../services/favouritesSlice';
import { useSelector } from 'react-redux';
import cartService from '../../services/cartService';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Wishlist() {

    const { token } = useSelector((state) => state.auth);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get From Wishlist
    const getFromWishlist = async () => {
        // TODO :
        setLoading(true);
        try {
            const getFavourites = await favouritesService.getFavourites(token);
            if (getFavourites.length > 0) {
                setWishlist(getFavourites);
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Remove From Wishlist
    const handleRemoveWishlist = async (id) => {
        setLoading(true);
        try {
            const deleteItem = await favouritesService.deleteFavourite(id, token);
            console.log(deleteItem);
            // Notification Msg
            toast.success("Successfully Delete", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Add To Cart
    const handleAddToCart = async (sku_id) => {
        try {
            const addProduct = await cartService.addCart(sku_id, token);
            console.log(addProduct);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFromWishlist();
        console.log(wishlist)
    }, [])

    return (
        <>
            {loading && <BackDropLoader />}

            {
                wishlist.length > 0 ? <div className="mx-auto py-10 px-4">
                    <div className="flex flex-col items-center">
                        <FaRegHeart className='text-gray-600 text-4xl mb-2' />
                        <h1 className="text-5xl font-bold mb-12 font-sans text-gray-700">My Wishlist</h1>
                    </div>
                    <WishlistItems items={wishlist} token={token} onDelete={handleRemoveWishlist} />

                    <Toaster />
                </div> : <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                    <div>
                        <p className='text-gray-500'>There is no items in your favourites right now.</p>
                        <Link to={`/`} className='btn btn-danger rounded-none shadow mt-3'>Go Back To Shopping</Link>
                    </div>
                </div>
            }

        </>
    )
}

export default Wishlist
