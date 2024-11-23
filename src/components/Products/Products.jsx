import { useCallback, useEffect, useState } from 'react'
import productService from "../../services/productService";
import { Loading, ProductCard } from '../index';
import categoryService from '../../services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import './css/product.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider } from '@mui/material';

function Products({
    className,
    ...props
}) {

    // State Variables
    const [loadState, setLoadState] = useState(true);
    const [gProducts, setGProducts] = useState([]);
    const [gCategories, setGCategories] = useState([]);

    // Fetching Categories And Products Data
    const fetchingData = useCallback(async () => {
        setLoadState(true);
        try {
            const { products } = await productService.getProducts();
            const getCategories = await categoryService.getCategories();

            setGProducts(products);
            setGCategories(getCategories);
            setLoadState(false);
        } catch (error) {
            setLoadState(false);
        }
    }, []);

    useEffect(() => {
        fetchingData();
    }, [fetchingData]);

    // Calculate Discount 
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    return (
        <div className='my-5 '>

            {
                loadState && <Loading />
            }

            {gCategories?.map(({ name, slug }) => (
                <div key={slug} style={{ marginBottom: '20px' }}>
                    <div className="row flex items-center justify-between">
                        <div className="col-lg-3 col-md-4 col-8">
                            <h4 className='text-2xl font-semibold text-black uppercase mb-2'>{name}</h4>
                        </div>
                        <div className="col-lg-6 col-md-5 md:block hidden">
                            <Divider sx={{ backgroundColor: "#aaa" }} />
                        </div>
                        <div className="col-md-3 text-end col-4">
                            <Link
                                to={`/products/${slug}`}
                                className='btn text-sm rounded-none text-white'
                                style={{ backgroundColor: "#b62026" }}
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={6}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            250: { slidesPerView: 1 },
                            576: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 4 },
                            1200: { slidesPerView: 5 },
                            1535: { slidesPerView: 6 },
                        }}
                        className="mySwiper"
                    >
                        <div className="row g-4">
                            {gProducts &&
                                gProducts.filter((prod) => prod.category === slug).slice(0, 10)
                                    .map((product, index) => (
                                        <SwiperSlide key={product.id} className="pr-1">
                                            <div key={index} className="product-list ">
                                                <ProductCard product={product} discountPrice={calculateDiscountedPrice} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                        </div>
                    </Swiper>

                </div>
            ))}
        </div >
    )
}

export default Products
