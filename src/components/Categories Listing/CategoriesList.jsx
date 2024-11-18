import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import category1 from "../../assets/Images/Categories/category (1).webp"
import category2 from "../../assets/Images/Categories/category (2).webp"
import category3 from "../../assets/Images/Categories/category (3).webp"
import category4 from "../../assets/Images/Categories/category (4).webp"
import category5 from "../../assets/Images/Categories/category (5).webp"
import category6 from "../../assets/Images/Categories/category (6).webp"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

function CategoriesList({ categories, className }) {

    const [loading, setLoading] = useState(true);

    // Icons Related To Each Category
    const categoryIcons = {
        beauty: "https://img.drz.lazcdn.com/static/pk/p/c8d248399513e9d7b4440f59386ed082.jpg_200x200q80.jpg_.webp",
        'mens-shirts': "https://img.drz.lazcdn.com/g/kf/Sbb5c35d0910b479ca437187c3e2b6c118.jpg_200x200q80.jpg_.webp",
        'sports-accessories': "https://img.drz.lazcdn.com/g/kf/S45c234881731424d9ac68546d8561a180.png_200x200q80.png_.webp",
        'mens-shoes': "https://img.drz.lazcdn.com/g/kf/S1e377d65d9cf457e94ab6bc40f5ab1c1P.jpg_200x200q80.jpg_.webp",
        'mens-watches': "https://img.drz.lazcdn.com/g/kf/Sa4ab3335ce9049008323268d56a2dfc1p.jpg_200x200q80.jpg_.webp",
        fragrances: "https://img.drz.lazcdn.com/static/pk/p/fd2e29058685dfdf6b0af3b36c08301d.jpg_200x200q80.jpg_.webp",
        furniture: "https://img.drz.lazcdn.com/static/pk/p/07902f42e6b3ff97b074cdab5ce38f34.jpg_200x200q80.jpg_.webp",
        groceries: "https://img.drz.lazcdn.com/static/pk/p/a4e92cb7244df70b1a7bb700cbd18cc9.jpg_200x200q80.jpg_.webp",
        'home-decoration': "https://img.drz.lazcdn.com/g/kf/Sf9bc244efa324cbe81d81f4ee57a97bam.jpg_200x200q80.jpg_.webp",
        'kitchen-accessories': "https://img.drz.lazcdn.com/static/pk/p/d1d7e4a700c1b0989f2fef3aa183323d.jpg_200x200q80.jpg_.webp",
        laptops: "https://img.drz.lazcdn.com/static/pk/p/e2dc868fd2d46e8f5d038a702aef25fb.jpg_200x200q80.jpg_.webp",
    };

    return (
        <>
            <div className={`${className} d-md-block d-none my-5`}>
                <h4 className='text-2xl text-bold text-gray-500'>Shop By Categories</h4>
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
                            categories && categories.slice(0, 10).map(({ slug, name }) => {
                                return (
                                    <SwiperSlide key={slug} className="p-4">
                                        <Link to={`/products/${slug}`} style={{ textDecoration: "none", color: "#333" }} className="bg-white d-flex align-items-center justify-content-center view-categories py-3 text-center">
                                            <div key={slug}>
                                                <div className="category-img">
                                                    <img src={categoryIcons[slug]} style={{ height: "125px", objectFit: "cover" }} className='' alt="" /> <br />
                                                </div>
                                                <h6 className='d-block mt-1' style={{ fontSize: "1rem", fontWeight: "600", color: "#2557aa" }}>{name}</h6>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </div>
                </Swiper>
            </div>


            {/* {
                isCategories ?
                    <>
                        <Layout>

                            <div className="mt-4 mb-5 mx-4 d-md-none d-block">
                                <h4 className='heading'>View Categories</h4>
                                <div className="row mt-3 g-4 bg-white shadow p-4">
                                    {
                                        mobCategories && mobCategories.map(({ slug, name }) => {
                                            return (
                                                <Link to={`/products/${slug}`} style={{ textDecoration: "none", color: "#333" }} className="col-6 col-sm-3 d-flex align-items-center justify-content-center view-categories bg-white border py-3 text-center">
                                                    <div>
                                                        <img src={categoryIcons[slug]} className='p-2' style={{ width: "100px", height: "80px" }} alt="" /> <br />
                                                        <span className='d-block mt-1' style={{ fontSize: ".9rem" }}>{name}</span>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Layout>
                    </>
                    :
                    <></>
            } */}

        </>
    )
}

export default CategoriesList;
