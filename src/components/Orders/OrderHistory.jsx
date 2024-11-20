import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import { OrderHistoryItems } from '../index';
import { fakeOrders } from './FakeOrders';

function OrderHistory() {

    const [orders, setOrders] = useState([]);

   

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
