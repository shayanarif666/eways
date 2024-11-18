import React, { useEffect, useState } from 'react';
import { CardMedia, Divider, Breadcrumbs, Link, Typography, Rating, FormControl, Select, MenuItem, InputLabel, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { FiCodesandbox } from "react-icons/fi";
import { PiCashRegisterLight } from "react-icons/pi";
import { RiExchange2Line } from "react-icons/ri";
import { MdOutlineNotInterested, MdNavigateNext } from "react-icons/md";
import ProductCard from '../Products/ProductCard';
import { Toaster } from 'react-hot-toast';
import productService from '../../services/productService';
import { ProductDetailLoader, ReviewForm, ReviewsAndRatings } from '../index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import "./productDetail.css"
import cartService from '../../services/cartService';

function ProductDetail() {

    // State Variables For Products
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productsByCategories, setProductsByCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0); // bug
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();
    const navigate = useNavigate();

    // Fetching Product Data
    const fetchingData = async () => {
        setLoading(true);
        try {
            const data = await productService.getProduct(id);
            setProduct(data);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };


    // Fetching Related Categories Products
    const fetchingProductsbyCategoriesData = async (category) => {
        try {
            const { products } = await productService.getProductsByCategories(category);
            setProductsByCategories(products);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };


    useEffect(() => {
        fetchingData();
        console.log(selectedImage)
    }, [id, selectedImage]);

    useEffect(() => {
        product && product.category ? fetchingProductsbyCategoriesData(product.category) : "";
    }, [product, id]);

    // Image Changing Each Click
    const handleImage = (id) => {
        setSelectedImage(id);
    }

    // Changing Quantity of Product

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    // Calculate Discount 
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    // Add To Cart
    const handleAddToCart = async (product, userID) => {
        try {
            const addProduct = await cartService.addCart(product, userID);
            console.log(addProduct)
        } catch (error) {
            console.log(error);
        }
    }

    // Remove To Cart
    const handleRemoveToCart = async (productID, userID) => {
        try {
            const removeProduct = await cartService.deleteCart(product, userID);
            console.log(removeProduct)
        } catch (error) {
            console.log(error);
        }
    }

    // Update Cart
    const handleUpdateCart = async (productID, userID) => {
        try {
            const updateProduct = await cartService.updateCart(product, userID);
            console.log(updateProduct)
        } catch (error) {
            console.log(error);
        }
    }

    // Wislist Add
    const handleWishlist = async (product, userID) => {
        // TODO : 
    }

    return (
        <>
            <section>

                <div className="container mx-auto">
                    <Breadcrumbs separator={<MdNavigateNext />}
                        aria-label="breadcrumb">
                        <Typography style={{ fontSize: ".9rem" }} color="#999">Home</Typography>
                        <Typography style={{ fontSize: ".9rem" }} color="#999">{product && product.category[0].toUpperCase() + product.category.slice(1)}</Typography>
                        <Typography style={{ fontSize: ".9rem" }} color="#999">{product && product.title}</Typography>
                    </Breadcrumbs>
                </div>

                {loading && <ProductDetailLoader />}

                <div className="container mt-3 mx-auto">
                    {product &&
                        <>
                            <Grid container className='product-detail-container p-4' style={{ backgroundColor: "#fff" }}>

                                <Grid item xs={12} md={5} lg={7} sx={{ pr: 3 }}>
                                    <CardMedia
                                        component="img"
                                        image={product.images[selectedImage]}
                                        alt="Product Image"
                                        sx={{ mb: 2 }}
                                    />

                                    <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                    <Grid container spacing={2} sx={{ pt: 2 }}>
                                        {product?.images.map((image, index) => (
                                            <Grid item key={image}>
                                                <CardMedia
                                                    component="img"
                                                    image={image}
                                                    className='xl:w-36 xl:h-36 w-20 h-20'
                                                    alt="Product Thumbnail"
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={() => handleImage(index)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={7} lg={5} sx={{ py: 5 }}>
                                    <div className="product-title">
                                        <h4 className='mb-3'>{product.title}</h4>
                                    </div>
                                    <div className="product-rating mb-2">
                                        <div className='d-flex align-items-center'>
                                            <Rating className='d-sm-flex d-none' name="read-only" value={product.rating} readOnly />
                                            <small>{product.rating} Ratings | {product.reviews.length} Peoples Reviews</small>
                                        </div>
                                    </div>
                                    <div className="product-brand mb-1">
                                        <span className='brand-name'>Brand :</span>
                                        <span className='brand-value'>{product.brand ? product.brand : "No Brand"}</span>
                                    </div>
                                    <div className="product-brand mb-2">
                                        <span className='brand-name'>Category :</span>
                                        <span className='brand-value'>{product.category[0].toUpperCase() + product.category.slice(1)}</span>
                                    </div>
                                    <div className="product-price">
                                        <span className='total-price'>Rs. {product.discountPercentage > 0 ? calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2) : product.price}</span>
                                    </div>
                                    <div className="product-discount mb-2">
                                        {
                                            product.discountPercentage > 0 ?
                                                <>
                                                    <del className='actual-price'>Rs. {product.price}</del>
                                                    <small className='actual-discount'>-{product.discountPercentage} %</small>
                                                </>
                                                : ""
                                        }

                                    </div>

                                    <p className='text-sm text-gray-600 mt-3'>Maximum quantity allowed is 5</p>

                                    <div className="md:flex items-center">
                                        <FormControl className='mt-4 mb-2 md:w-1/5 w-full'>
                                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={quantity}
                                                label="Quantity"
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                            </Select>
                                        </FormControl> <br />

                                        <button
                                            onClick={() => handleAddToCart(product, 7)}
                                            className='md:w-3/5 w-full rounded-none btn bg-red-600 hover:bg-red-700 font-semibold text-white shadow mt-3 md:ms-4'
                                            style={{ padding: "0.7rem 3.5rem", fontSize: "1.1rem" }}
                                        >
                                            Add to Cart
                                        </button>

                                        <div className="product-store md:ms-3 mt-3 md:w-1/5 w-full">
                                            <GoHeart className='text-gray-60 text-5xl border border-gray-400 rounded-full p-2 hover:bg-red-200' />
                                        </div>
                                    </div>

                                    <Toaster />

                                    <div className="d-block">
                                        <div className="delivery-occurances mt-3">

                                            <h6>Delivery</h6>

                                            <div className="delivery-time mb-3">
                                                <div className="delivery-icon">
                                                    <FiCodesandbox />
                                                </div>
                                                <div className="delivery-details">
                                                    <div className="delivery-type">
                                                        <strong>Standard Delivery</strong> 15 Jul - 20 Jul
                                                    </div>
                                                    <div className="delivery-aspected-time">
                                                        4 - 9 day(s)
                                                    </div>
                                                </div>
                                            </div>

                                            <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                            <div className="online-delivery mb-3 mt-2">
                                                <div className="delivery-icon">
                                                    <PiCashRegisterLight />
                                                </div>
                                                <div className="online-delivery-details">
                                                    <p>Cash On Delivery Available</p>
                                                </div>
                                            </div>

                                            <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                            <h6 className='mt-3'>Service</h6>

                                            <div className="delivery-warrenty mb-3">
                                                <div className="delivery-icon">
                                                    <RiExchange2Line />
                                                </div>
                                                <div className="warrenty-details">
                                                    <div className="warrenty-time">
                                                        <p>{product.returnPolicy}</p>
                                                    </div>
                                                    <div className="warrenty-type">
                                                        <small className='mt-3 d-block'>Change of Mind applicable</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="delivery-availability">
                                                <div className="delivery-icon">
                                                    <MdOutlineNotInterested />
                                                </div>
                                                <div className="delivery-availibility-status">
                                                    <p>{product.warrantyInformation}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="stats-occurances mt-lg-3 mt-0">

                                            <h6>Sold by</h6>

                                            <div className="stats-container">
                                                <div className="stats-box">
                                                    <div className="stats-label">Positive Seller Ratings</div>
                                                    <div className="stats-value">90%</div>
                                                </div>
                                                <div className="stats-box">
                                                    <div className="stats-label">Ship on Time</div>
                                                    <div className="stats-value">99%</div>
                                                </div>
                                                <div className="stats-box">
                                                    <div className="stats-label">Chat Response Rate</div>
                                                    <div className="stats-value">86%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Grid>

                            </Grid>

                            <div className="row mt-4 g-4">

                                <ul class="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Overview</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Reviews ({product.reviews.length})</button>
                                    </li>
                                </ul>
                                <Divider className='bg-gray-400' sx={{ marginTop: "-1rem" }} />
                                <div class="tab-content text-center mb-5" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                        <div className="item-detail p-4">

                                            <div className='d-flex align-items-center'>
                                                <span style={{ fontSize: ".9rem" }}>Description :</span>
                                                <p className='text-md text-gray-700 ms-2'>{product.description}</p>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Product Dimension :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Weight :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.weight} Kilogram</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Barcode :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.meta.barcode}</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Created Product :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.meta.createdAt.replace("T", " ").slice(0, 10)}</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Minimum Item Quantity :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.minimumOrderQuantity} Pieces</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>Maximum Item Quantity :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>5 Pieces</span>
                                            </div>

                                            <div className="d-flex align-items-center mt-4">
                                                <span style={{ fontSize: ".9rem" }}>SKU :</span>
                                                <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.sku} Pieces</span>
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

                                            <ReviewForm />

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Grid spacing={4} className='mt-5'>

                                <h4 className='text-xl font-semibold'>Related Products</h4>

                                <Divider className='mt-4 mb-3 bg-gray-400' />

                                <Swiper
                                    modules={[Navigation]}
                                    slidesPerView={6}
                                    navigation
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        400: { slidesPerView: 1 },
                                        576: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        992: { slidesPerView: 4 },
                                        1200: { slidesPerView: 5 },
                                        1535: { slidesPerView: 6 },
                                    }}
                                    className="mySwiper"
                                >
                                    <div className="row">
                                        {
                                            productsByCategories?.filter((prod) => prod.id !== parseInt(id)).slice(0, 18).map((product) => {
                                                return (
                                                    <SwiperSlide key={product.id} className="p-4">
                                                        <ProductCard product={product} discountPrice={calculateDiscountedPrice} />
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </div>
                                </Swiper>

                            </Grid>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default ProductDetail;
