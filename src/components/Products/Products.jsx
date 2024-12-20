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
import { Divider } from '@mui/material';
import { Toaster } from 'react-hot-toast';

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
            const products = await productService.getProducts();
            const getCategories = await categoryService.getCategories();

            setGProducts(products);
            setGCategories(getCategories);
            setLoadState(false);

            console.log("products fetching", products[0]?.category_name, gCategories[0].name)
        } catch (error) {
            setLoadState(false);
        }
    }, []);

    useEffect(() => {
        fetchingData();
    }, [fetchingData]);

    return (
        <div className='my-5 '>

            {
                loadState && <Loading />
            }

            {gCategories?.map(({ name, id }) => (
                <div key={id} style={{ marginBottom: '20px' }}>
                    <div className="row flex items-center justify-between">
                        <div className="col-lg-3 col-md-4 col-8">
                            <h4
                                className='text-xl font-semibold text-black mb-2 font-bold'
                                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}
                            >
                                {name}
                            </h4>
                        </div>
                        <div className="col-lg-6 col-md-5 md:block hidden">
                            <Divider sx={{ backgroundColor: "#aaa" }} />
                        </div>
                        <div className="col-md-3 text-end col-4">
                            <Link
                                to={`/products/${id}`}
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
                            992: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 },
                            1535: { slidesPerView: 6 },
                        }}
                        className="mySwiper"
                    >
                        <div className="row g-4">
                            {gProducts &&
                                gProducts.filter((prod) => prod.category_name === name).slice(0, 10)
                                    .map((product, index) => (
                                        <SwiperSlide key={product.id} className="pr-1">
                                            <div key={index} className="product-list ">
                                                <ProductCard product={product} className='bg-white me-2' />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                        </div>
                    </Swiper>
                </div>
            ))}
            <Toaster />
        </div >
    )
}

export default Products
