import React from 'react';
import { FaStar, FaWarehouse, FaShippingFast, FaQuestionCircle } from "react-icons/fa";

function WhyShopWithUs() {

    const features = [
        {
            icon: <FaStar size={40} className="text-orange-500 mb-4 m-auto" />,
            title: "SAVINGS SAVINGS & SAVINGS",
            description: "Mega discount offers all year round.",
        },
        {
            icon: <FaWarehouse size={40} className="text-orange-500 mb-4 m-auto" />,
            title: "ALL THINGS AT ONE CLICK",
            description: "All your essential products available at QnE.",
        },
        {
            icon: <FaShippingFast size={40} className="text-orange-500 mb-4 m-auto" />,
            title: "FAST SHIPPING",
            description: "Fast and convenient delivery at your doorstep.",
        },
        {
            icon: <FaQuestionCircle size={40} className="text-orange-500 mb-4 m-auto" />,
            title: "HAVE QUESTIONS?",
            description: "Excellent Customer Service – We’re here and happy to help!",
        },
    ];

    return (
        <>
            <div className='my-5'>
                <h2 className="text-2xl font-bold text-center mb-8">Why Shop With Us?</h2>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center" style={{borderRadius: "0%"}}>
                            <span>{feature.icon}</span>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WhyShopWithUs
