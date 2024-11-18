import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Rating } from "@mui/material"
import { Link } from 'react-router-dom';
import './css/product.css';

function ProductCard({ product, discountPrice }) {
    return (
        <div className='card-box'>
            <Card className='my-2 p-3'>
                <Link to={`/product-detail/${product.id}`} style={{ textDecoration: "none", color: "#333" }}>
                    <div className='card-img'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="150"
                            image={product.thumbnail}
                        />
                        <div className="badge">
                            <small>-{product.discountPercentage.toFixed(2)}%</small>
                        </div>
                    </div>
                    <CardContent>
                        <p>
                            {product.description.slice(0, 35)}....
                        </p>
                    </CardContent>

                    <h6>Rs. {discountPrice(product.price, product.discountPercentage).toFixed(2)}</h6>
                    {
                        product.discountPercentage ?
                            <div>
                                <del className='me-2'>Rs.{product.price}</del>
                            </div>
                            : ""
                    }
                    <div className="rating d-flex align-items-center">
                        <Rating name="read-only" className='mt-2' value={product.rating} readOnly />
                        <small className='ms-1'>({product.rating})</small>
                    </div>

                </Link>
            </Card>
        </div>
    )
}

export default ProductCard
