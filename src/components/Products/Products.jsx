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

function Products({
    className,
    ...props
}) {

    // State Variables
    const [loadState, setLoadState] = useState(true);
    const [gProducts, setGProducts] = useState([]);
    const [gCategories, setGCategories] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display on scroll
    const [page, setPage] = useState(1); // Current page
    const [hasMore, setHasMore] = useState(true); // Check if more products exist

    let pageSize = 40;

    // Fetching Categories And Products Data
    const fetchingData = useCallback(async () => {
        setLoadState(true);
        try {
            const { products, total } = await productService.getProducts();
            const getCategories = await categoryService.getCategories();

            setGProducts(products);
            setGCategories(getCategories);
            setDisplayedProducts(products.slice(0, pageSize)); // Display the first page of products
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

    // Load more products on scroll
    const loadMoreProducts = () => {
        const nextPage = page + 1;
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;

        if (startIndex >= gProducts.length) {
            setHasMore(false); // No more products to load
            return;
        }

        // Add next page of products to the displayed list
        setDisplayedProducts((prevProducts) => [
            ...prevProducts,
            ...gProducts.slice(startIndex, endIndex),
        ]);
        setPage(nextPage); // Update current page
    };

    return (
        <div className='my-5 '>

            <InfiniteScroll
                dataLength={displayedProducts.length} // Current length of displayed products
                next={loadMoreProducts} // Function to load next products
                hasMore={hasMore} // Boolean to check if more data is available
                loader={
                    <div className="py-3 text-center">
                        <Loading className="m-auto" />
                    </div>
                }
            >
                {gCategories?.map(({ name, slug }) => (
                    <div key={slug} style={{ marginBottom: '20px' }}>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className='text-2xl text-bold text-gray-500'>{name}</h4>
                            {/* <Divider sx={{ backgroundColor: "#aaa", width: "50%" }} /> */}
                            <Link to={`/products/${slug}`} className='btn hover:bg-gray-200 text-sm rounded-none'>View All</Link>
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
                                            <SwiperSlide key={product.id} className="pr-3">
                                                <div key={index} className="product-list ">
                                                    <ProductCard product={product} discountPrice={calculateDiscountedPrice} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                            </div>
                        </Swiper>

                    </div>
                ))}
            </InfiniteScroll>
        </div >
    )
}

export default Products
