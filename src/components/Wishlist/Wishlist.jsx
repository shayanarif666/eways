import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { WishlistItems } from '../index';
import { items } from "./fakeItems"

function Wishlist() {

    // Get From Wishlist
    const getFromWishlist = async (product, userID) => {
        // TODO : 
    }

    // Remove From Wishlist
    const handleWishlist = async (product, userID) => {
        // TODO : 
    }

    // Add To Cart
    const handleAddToCart = async (product, userID) => {
        try {
            const addProduct = await cartService.addCart(product, userID);
            console.log(addProduct)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mx-auto py-10 px-4">
                <div className="flex flex-col items-center">
                    <FaRegHeart className='text-gray-600 text-4xl mb-2' />
                    <h1 className="text-5xl font-bold mb-12 font-sans text-gray-700">My Wishlist</h1>
                </div>
                <WishlistItems items={items} />
            </div>
        </>
    )
}

export default Wishlist
