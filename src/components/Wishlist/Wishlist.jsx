import React from 'react';
import { Button, IconButton } from '@mui/material';
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

function Wishlist() {

    // Fake Data
    const items = [
        {
            id: 1,
            name: 'Beanie with Logo',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXfdAAcJU1JhJOLSK95lnzHtlRbacOw5jp2Q&s',
            price: 20,
            discountedPrice: 18,
            status: 'In Stock',
            addedDate: 'December 5, 2019',
        },
        {
            id: 2,
            name: 'Classy Shirt',
            image: 'https://www.fashionholic.pk/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-17-at-3.42.08-PM-3-scaled.jpeg',
            price: 16,
            discountedPrice: 12,
            status: 'In Stock',
            addedDate: 'December 6, 2019',
        },
    ]

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
                <table className="w-full text-left border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 border">Product Name</th>
                            <th className="p-4 border">Unit Price</th>
                            <th className="p-4 border">Stock Status</th>
                            <th className="p-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border">
                                <td className="p-4 flex items-center">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                                    {item.name}
                                </td>
                                <td className="p-4 border">
                                    <span className="line-through text-gray-500">${item.price.toFixed(2)}</span>{' '}
                                    <span className="text-green-600 ms-2">${item.discountedPrice.toFixed(2)}</span>
                                </td>
                                <td className="p-4 border">{item.status}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-3xl'>
                                        Add to Cart
                                    </button>
                                    <IconButton
                                        color="error"
                                    >
                                        <MdDelete className='text-gray-400' />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Wishlist
