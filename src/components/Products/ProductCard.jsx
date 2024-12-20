import React from 'react'
import { Card, CardMedia } from "@mui/material"
import { Link } from 'react-router-dom';
import './css/product.css';
import cartService from '../../services/cartService';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function ProductCard({
    product,
    isDescription = "",
    className = "",
    ...props
}) {

    // Get User Data
    const { userData, token } = useSelector((state) => state.auth);

    // Handle Add To Cart
    const handleAddToCart = async (sku_id) => {
        try {
            const product = { sku_id, quantity: 1 };
            const addProduct = await cartService.addCart(product, token);
            // Notification Msg
            toast.success("Add Product Cart Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            console.log(addProduct);
        } catch (error) {
            console.log(error);
        }
    }
    
    // Discount Percentage
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = Math.round(originalPrice - (originalPrice * (discount / 100)));
        return discountedPrice;
    };

    return (
        <div className={`card-box ${className}`}>
            <Card className='my-2 p-3'>
                <Link to={`/product-detail/${product.sku_id}`} style={{ textDecoration: "none", color: "#333" }}>
                    <div className='card-img'>
                        <CardMedia
                            component="img"
                            height="150"
                            loading='lazy'
                            image={product.imgPath ? product.imgPath : "https://qne.com.pk/cdn/shop/files/orgsize_48450WhatsApp_Image_2024-11-28_at_12.41.23_PM-removebg-preview.png?v=1732876894"}
                        />
                        <div className="badge-save bg-red-100 text-red-600">
                            <em>Save {product.new_price > 0 ? calculateDiscountedPrice(product.new_price, product.old_price).toFixed(2) : ""}%</em>
                        </div>
                        <div className="badge-new bg-blue-100 text-blue-600">
                            <em>New</em>
                        </div>
                    </div>
                    <p>
                        {product.title}....
                    </p>
                    {
                        isDescription ?
                            <p className='mb-2' style={{ fontSize: ".75rem" }}>
                                {product.description.slice(0, 80)}...
                            </p>
                            :
                            <></>
                    }
                    <h6>Rs. {product.new_price.toFixed(2)}</h6>
                    {
                        product.new_price ?
                            <div>
                                <del className='me-2'>Rs.{product.old_price.toFixed(2)}</del>
                            </div>
                            : ""
                    }
                </Link>
                <div className='mt-2'>
                    <button
                        className='transition-all btn-cart rounded-3xl hover:bg-red-700 hover:text-white block px-5 py-1 font-semibold text-sm'
                        style={{ border: "1px solid #111" }}
                        onClick={() => handleAddToCart(product.sku_id)}
                    >
                        Add To Cart
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default ProductCard
