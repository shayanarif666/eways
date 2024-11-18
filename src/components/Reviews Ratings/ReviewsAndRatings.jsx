import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Chip, Avatar, Divider } from '@mui/material';
import { GiFactory } from "react-icons/gi";
import "./reviews.css";

function ReviewsAndRatings({ product }) {
    return (
        <>
            <Box className="ratings-reviews">
                {
                    product.reviews.length > 0 ? product.reviews.map((review) => {
                        return (
                            <div className="people-review mt-4">
                                <div className="reviewer-name-container d-flex align-items-center">
                                    <div className="me-3 img d-flex align-items-center justify-content-center" style={{ width: "30px", color: "#666", fontSize: "1rem", height: "30px", backgroundColor: `#eee`, borderRadius: "50%" }}>{review.reviewerName[0]}</div>
                                    <div className="reviewer-name">
                                        <h6 className='text-xs text-gray-500' style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600 }}>{review.reviewerName}</h6>
                                        <span className='text-xs text-gray-500'>{review.date.replace("T", " ").slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className="reviewer-rating mt-2 d-flex align-items-center">
                                    <Rating name="read-only" sx={{ fontSize: "1rem" }} value={review.rating} readOnly />
                                </div>
                                <div className="reviewer-rating mt-3 d-flex align-items-center">
                                    <span className='block text-sm text-black font-semibold'>{review.comment}</span>
                                </div>
                                <Divider sx={{ marginTop: "1rem", backgroundColor: "#ccc" }} />
                            </div>
                            
                        )
                    })
                        :
                        <div className='text-center mt-4'>
                            <GiFactory className='text-5xl text-gray-400 m-auto mb-2' />
                            <p className='text-sm text-gray-500'>This product doesn't have any ratings or reviews yet.</p>
                        </div>
                }
            </Box>
        </>
    )
}

export default ReviewsAndRatings
