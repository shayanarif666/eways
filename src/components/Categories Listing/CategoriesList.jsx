import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { categoryIcons } from './CategoryIcons';

function CategoriesList({ categories, className }) {

    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className={`${className} d-md-block d-none my-5`}>
                <h4 className='text-2xl font-semibold text-black uppercase mb-4'>Popular Categories</h4>
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
                        {
                            categories && categories.map(({ slug, name }) => {
                                return (
                                    <SwiperSlide key={slug} className="p-1">
                                        <Link to={`/products/${slug}`} style={{ textDecoration: "none", color: "#333" }} className="bg-white d-flex align-items-center justify-content-center view-categories py-3 text-center">
                                            <div key={slug}>
                                                <div className="category-img">
                                                    <img src={categoryIcons[slug]} className='h-60 object-contain' alt="" /> <br />
                                                </div>
                                                <h6 className='d-block mt-1 text-xl uppercase font-semibold'>{name}</h6>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </div>
                </Swiper>
            </div>

        </>
    )
}

export default CategoriesList;
