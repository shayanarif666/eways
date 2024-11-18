import { useCallback, useEffect, useState } from 'react'
import productService from "../../services/productService";
import { Loading, ProductCard } from '../index';
import categoryService from '../../services/categoryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './css/product.css';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

function Products({
    className,
    ...props
}) {

    const [loadState, setLoadState] = useState(true);
    const [gProducts, setGProducts] = useState([]);
    const [gCategories, setGCategories] = useState([]);

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

            {loadState && <div className='py-3 text-center'>
                <Loading className="m-auto" />
            </div>}

            {gCategories?.slice(0, 4).map(({ name, slug }) => (
                <div key={slug} style={{ marginBottom: '20px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h4 className='text-2xl text-bold text-gray-500'>{name}</h4>
                        <Divider sx={{ backgroundColor: "#aaa", width: "80%" }} />
                        <Link to={`/products/${slug}`} className='btn hover:bg-gray-200 text-sm rounded-none'>View All</Link>
                    </div>
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
                        <div className="row g-4 bg-white">
                            {gProducts &&
                                gProducts.filter((prod) => prod.category === slug).slice(0, 10)
                                    .map((product, index) => (
                                        <SwiperSlide key={product.id} className="p-4 bg-white">
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
