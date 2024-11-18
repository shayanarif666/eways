import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import { OrderHistoryItems } from '../index';

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    // Fake Orders
    const fakeOrders = [
        {
            invoice: "INV-3066",
            status: "Received",
            paymentStatus: "Paid",
            deliveryAddress: "123 Main St, Springfield",
            items: [{ id: 12, title: "Blue Tshirt", img: "https://static-01.daraz.pk/p/1b5b6bc4c8496cf247a8739705435602.jpg" }]
        },
        {
            invoice: "INV-3065",
            status: "Cancelled",
            paymentStatus: "UnPaid",
            deliveryAddress: "456 Elm St, Shelbyville",
            items: [{ id: 13, title: "Jeans Pent", img: "https://www.sharrys.pk/cdn/shop/products/31_9fa70f26-94b1-4a96-b802-a3fab3226117_800x.jpg?v=1670192069" }]
        },
        {
            invoice: "INV-3064",
            status: "Received",
            paymentStatus: "Paid",
            deliveryAddress: "789 Oak St, Capital City",
            items: [{ id: 14, title: "Haier AC", img: "https://odishaac.com/wp-content/uploads/2022/07/split-ac-system-transparent.png" }]
        },
    ];

    // Search Items Showcasing
    const handleSearchItems = (value) => {
        if (value !== "") {
            const filteredOrders = orders.filter((order) => order.items[0].title.toLowerCase().includes(value.toLowerCase()));
            setOrders(filteredOrders);
        } else setOrders(fakeOrders)
    }

    // Display All Products Initially
    useEffect(() => {
        setOrders(fakeOrders);
    }, [])

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-semibold">Order History</h1>
                <p className='mt-1 font-sans text-sm'>Your Recent Orders And Invoices</p>

                <Divider className='mb-5 bg-gray-400 mt-4' />

                <div className="flex items-center justify-between mb-4">
                    <div className="w-full">
                        <h6 className='text-sm font-semibold'>Order details</h6>
                        <p className='mt-1 font-sans text-sm'>View your recent orders and payments</p>
                    </div>
                    <div className="w-full">
                        <input type="search" onChange={(e) => handleSearchItems(e.target.value)} className='ms-auto form-control mb-4 border-0 rounded-none py-2 focus:shadow-none' placeholder='Search Order Items' />
                    </div>
                </div>

                <OrderHistoryItems orders={orders} />
            </div>
        </>
    )
}

export default OrderHistory
