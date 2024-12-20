import React, { useState } from 'react';
import { Rating, TextField } from '@mui/material';
import reviewService from '../../services/reviewsAndRatings';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

function ReviewForm({ productId, skuId }) {

    // State Variables
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Access Token 
    const { token } = useSelector((state) => state.auth);

    // Add Rating
    const handleRating = async (e, newValue) => {
        setRating(newValue);
        try {
            const userRating = {
                id: 0,
                user_id: 0,
                product_id: productId,
                rating: newValue,
                sku_id: skuId
            };
            const rating = await reviewService.addRating(token, userRating);
            // Notification Msg
            toast.success("Add Rating Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            console.log("rating add", rating);
        } catch (error) {
            console.log(error);
        }
    }

    // Add Comment 
    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const userReview = {
                id: 0,
                user_id: 0,
                comments: comment,
                product_id: productId
            }
            const review = await reviewService.addReview(token, userReview);
            // Notification Msg
            toast.success("Add Comment Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            console.log("review add", review);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="">
            <div className='mb-4'>
                <h3 className="text-start text-sm text-gray-500 font-semibold mb-2">Your Rating</h3>
                <div className="d-flex align-items-center">
                    <label htmlFor="" className='text-sm text-gray-500 me-2 sm:block xs:hidden'>Overall Product Rating</label>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => handleRating(e, newValue)}
                        size="medium"
                    />
                </div>
            </div>

            <div className="text-start">
                <div className="mt-4">
                    <label htmlFor="">Comment</label>
                    <TextField
                        variant="outlined"
                        fullWidth
                        className=""
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </div>

            <div className="text-start">
                <button className="mt-4 btn btn-danger rounded-none px-6" onClick={handleComment}>
                    Submit Review
                </button>
            </div>

            <Toaster />

        </form>
    );
}

export default ReviewForm;