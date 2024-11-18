import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import slide1 from "../../assets/Images/Banners/banner (1).webp"
import slide2 from "../../assets/Images/Banners/banner (2).webp"
import slide3 from "../../assets/Images/Banners/banner (3).webp"
import slide4 from "../../assets/Images/Banners/banner (4).webp"
import slide5 from "../../assets/Images/Banners/banner (5).webp"
import slide6 from "../../assets/Images/Banners/banner (6).webp"
import banner from "../../assets/Images/banner.webp"
import "./slider.css"

function Slider() {
    return (
        <>
            <div className="container mt-5">
                <Carousel style={{ borderRadius: "15px" }} autoPlay={true} interval={2000} infiniteLoop={true} showArrows={true} showThumbs={false} transitionTime={1000} >
                    <div className='carousel-slider-img'>
                        <img src={slide1} />
                    </div>
                    <div className='carousel-slider-img'>
                        <img src={slide2} />
                    </div>
                    <div className='carousel-slider-img'>
                        <img src={slide3} />
                    </div>
                    <div className='carousel-slider-img'>
                        <img src={slide4} />
                    </div>
                    <div className='carousel-slider-img'>
                        <img src={slide5} />
                    </div>
                    <div className='carousel-slider-img'>
                        <img src={slide6} />
                    </div>
                </Carousel>

                <img src={banner} className='w-100' alt="" />
            </div>
        </>
    )
}

export default Slider
