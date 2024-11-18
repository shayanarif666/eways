import React, { useState } from 'react';
import { Rating, TextField } from '@mui/material';

function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [nickname, setNickname] = useState('');
    const [summary, setSummary] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ rating, nickname, summary, review });
        // Add form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <div className='mb-4'>
                <h3 className="text-start text-sm text-gray-500 font-semibold mb-2">Your Rating</h3>
                <div className="d-flex align-items-center">
                    <label htmlFor="" className='text-sm text-gray-500 me-2 sm:block xs:hidden'>Overall Product Rating</label>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        size="medium"
                    />
                </div>
            </div>

            <div className="text-start">
                <div className="mt-4">
                    <label htmlFor="">Name</label>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="">Comment</label>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className=""
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="">Review</label>
                    <TextField
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="text-start">
                <button className="mt-4 btn btn-danger rounded-none px-6">
                    Submit Review
                </button>
            </div>
        </form>
    );
}

export default ReviewForm;