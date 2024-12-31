import React, { useEffect, useState } from 'react';
import { CardMedia, Divider, Breadcrumbs, Typography, Rating, FormControl, Select, MenuItem, InputLabel, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { FiCodesandbox } from "react-icons/fi";
import { PiCashRegisterLight } from "react-icons/pi";
import { RiExchange2Line } from "react-icons/ri";
import { MdOutlineNotInterested, MdNavigateNext } from "react-icons/md";
import ProductCard from '../Products/ProductCard';
import toast, { Toaster } from 'react-hot-toast';
import productService from '../../services/productService';
import { ProductDetailLoader, ProductVendor } from '../index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import "./productDetail.css"
import cartService from '../../services/cartService';
import { useSelector } from 'react-redux';
import favouritesService from '../../services/favouritesSlice';

function ProductDetail() {

    // Get From Store
    const { userData, token } = useSelector((state) => state.auth);

    // State Variables For Products
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isProductCart, setIsProductCart] = useState(false);
    const [cart, setCart] = useState([]);

    const { id } = useParams();

    // Fetching Product Data
    const fetchingData = async () => {
        setLoading(true);
        try {
            const data = await productService.getProduct(id);
            const images = data.imgPath?.split(",")
            setProduct(data);
            setImages(images);
            setLoading(false);
            console.log(data)
            console.log("images", images, images.length, images[0])
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };


    // Get Data From Cart
    const getCartData = async () => {
        try {
            const getCart = await cartService.getCart(token);
            setCart(getCart);
            console.log(getCart);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchingData();
        getCartData();
    }, [id, selectedImage]);

    // Image Changing Each Click
    const handleImage = (id) => {
        setSelectedImage(id);
    }

    // Add To Cart
    const handleAddToCart = async (sku_id) => {
        try {
            const product = { sku_id, quantity };
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

    // Wislist Add
    const handleAddWishlist = async (sku_id) => {
        // TODO : 
        try {
            const addFavourite = await favouritesService.addFavourite(sku_id, token);
            // Notification Msg
            toast.success("Product In Favourites Add Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            console.log(addFavourite);
        } catch (error) {
            console.log(error)
        }
    }

    // Is Product Present In Cart
    useEffect(() => {
        const isProductFound = cart?.some((prod) => {
            return prod.sku_id === parseInt(id);
        })
        setIsProductCart(isProductFound);
    }, [cart])

    return (
        <>
            <section>

                <div className="container mx-auto">
                    <Breadcrumbs separator={<MdNavigateNext />}
                        aria-label="breadcrumb">
                        <Typography style={{ fontSize: ".9rem" }} color="#999">Home</Typography>
                        <Typography style={{ fontSize: ".9rem" }} color="#999">{product && product.product.relatedProduct[0].category_name}</Typography>
                        <Typography style={{ fontSize: ".9rem" }} color="#999">{product && product.title?.slice(0, 30)}...</Typography>
                    </Breadcrumbs>
                </div>

                {loading && <ProductDetailLoader />}

                {!loading && <div className="container mt-3 mx-auto">
                    {product &&
                        <>
                            <Grid container className='product-detail-container p-4' style={{ backgroundColor: "#fff" }}>

                                <Grid item xs={12} md={5} lg={7} sx={{ pr: 3 }}>
                                    <CardMedia
                                        component="img"
                                        image={images.length > 0 ? `https://admin.almehdisolutions.com/${images[selectedImage]}` : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"}
                                        alt="Product Image"
                                        sx={{ mb: 2, height: "500px", objectFit: "contain" }}
                                    />

                                    <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                    <Grid container spacing={2} sx={{ pt: 2 }}>
                                        {images.length > 0 && images.map((image, index) => (
                                            <Grid item key={image}>
                                                <CardMedia
                                                    component="img"
                                                    image={`https://admin.almehdisolutions.com/${image}`}
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
                                            <small>{product.averageRating} Ratings | {product.product.comments.length} Peoples Reviews</small>
                                        </div>
                                    </div>
                                    <div className="product-brand mb-1">
                                        <span className='brand-name'>Brand :</span>
                                        <span className='brand-value'>{product.brand ? product.brand : "No Brand"}</span>
                                    </div>
                                    <div className="product-brand mb-2">
                                        <span className='brand-name'>Category :</span>
                                        <span className='brand-value'>{product.product.relatedProduct[0]?.category_name}</span>
                                    </div>
                                    <div className="product-price">
                                        <span className='total-price'>Rs. {product.new_price > 0 ? product.new_price.toFixed(2) : product.old_price.toFixed(2)} </span>
                                    </div>
                                    <div className="product-discount mb-2">
                                        {
                                            product.new_price > 0 ?
                                                <>
                                                    <del className='actual-price'>Rs. {product.old_price.toFixed(2)}</del>
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
                                                onChange={(e) => setQuantity(e.target.value)}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                            </Select>
                                        </FormControl> <br />

                                        <button
                                            type='button'
                                            onClick={() => handleAddToCart(product.id)}
                                            className={`${isProductCart ? "opacity-50" : ""} md:w-3/5 w-full rounded-none bg-red-600 ${isProductCart ? "" : "hover:bg-red-700"} font-semibold text-white shadow mt-3 md:ms-4`}
                                            style={{ padding: "0.7rem 3.5rem", fontSize: "1.1rem" }}
                                            disabled={isProductCart ? true : false}
                                        >
                                            Add to Cart
                                        </button>

                                        <div className="product-store md:ms-3 mt-3 md:w-1/5 w-full">
                                            <GoHeart onClick={() => handleAddWishlist(product.id)} className='text-gray-60 text-5xl border border-gray-400 rounded-full p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer' />
                                        </div>

                                        <Toaster />

                                    </div>

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
                                                    <p>3 Months Warrenty Period</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </Grid>

                            </Grid>

                            {/* Product Information Vendors */}
                            <ProductVendor product={product} />

                            {/* Similar Products */}
                            <Grid spacing={4} className='my-5'>

                                <h4 className='text-xl font-semibold'>Related Products</h4>

                                <Divider className='mt-4 mb-3 bg-gray-400' />

                                <Swiper
                                    modules={[Navigation]}
                                    slidesPerView={4}
                                    navigation
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        0: { slidesPerView: 1 },
                                        400: { slidesPerView: 1 },
                                        576: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        992: { slidesPerView: 4 }
                                    }}
                                    className="mySwiper"
                                >
                                    <div className="row">
                                        {
                                            product.product.relatedProduct.filter((prod) => prod.sku_id !== parseInt(id)).map((product) => {
                                                return (
                                                    <SwiperSlide key={product.id} className="pr-4">
                                                        <ProductCard product={product} />
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </div>
                                </Swiper>

                            </Grid>
                        </>
                    }
                </div>}
            </section>
        </>
    )
}

export default ProductDetail;
