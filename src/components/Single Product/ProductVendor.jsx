import React from 'react';
import { Divider } from '@mui/material';
import { ReviewForm, ReviewsAndRatings } from '../index';
import "./vendors.css";

const ProductVendor = ({ product }) => {
    return (
        <>
            <div className="vendor-row row mt-4 g-4">

                <ul class="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Overview</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-description" type="button" role="tab" aria-controls="pills-description" aria-selected="false">Description</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Reviews</button>
                    </li>
                </ul>

                <Divider className='bg-gray-400' sx={{ marginTop: "-1rem" }} />

                <div class="tab-content text-center mb-5" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                        <div className="item-detail sm:p-4">

                            <div className="block sm:flex items-center sm:justify-around">
                                <div className="d-flex align-items-center">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Product Dimension :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.width} x {product.length}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Weight :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.weight} Kilogram</span>
                                </div>
                            </div>

                            <div className="block sm:flex items-center sm:ustify-around">
                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Modal :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.model}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Created Product :</span>
                                    {/* <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.meta.createdAt.replace("T", " ").slice(0, 10)}</span> */}
                                </div>
                            </div>

                            <div className="block sm:flex items-center sm:justify-around">
                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Minimum Item Quantity :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>1 Piece</span>
                                </div>

                                <div className="flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Maximum Item Quantity :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>5 Pieces</span>
                                </div>
                            </div>

                            <div className="block sm:flex items-center sm:justify-around">
                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>SKU :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.sku_name}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Vendor :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.vendor_id}</span>
                                </div>
                            </div>

                            <div className="block sm:flex items-center sm:justify-around">
                                <div className="d-flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Promotion Code :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.promotion}</span>
                                </div>

                                <div className="flex align-items-center mt-4">
                                    <span className='font-semibold' style={{ fontSize: ".9rem" }}>Condition :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.condition}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab" tabindex="0">
                        <div className="item-detail p-4">
                            <div className='d-flex align-items-center'>
                                <p className='text-md text-gray-700 ms-2'>{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                        <div className="reviews p-4">
                            <h2 className='text-2xl text-start text-gray-500'>Customer Reviews</h2>

                            <Divider sx={{ marginTop: "1rem", backgroundColor: "#ccc" }} />

                            <ReviewsAndRatings product={product} />

                            <div className="review-form my-8 text-start">
                                <h4 className='uppercase text-black font-semibold text-sm'>You're Reviewing</h4>
                                <h5 className='mt-1 uppercase text-black font-semibold text-sm'>{product.title}</h5>
                            </div>

                            <ReviewForm productId={product.product_id} skuId={product.id} />

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductVendor
