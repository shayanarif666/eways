import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import { BackDropLoader, OrderHistoryItems } from '../index';
import { useSelector } from 'react-redux';
import orderService from '../../services/orderService';

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Access Token
    const { token } = useSelector((state) => state.auth);

    // Search Items Showcasing
    const fetchDeliveredOrders = async () => {
        setLoading(true);
        try {
            const orders = await orderService.deliveredOrders(token);
            setOrders(orders);
            setLoading(false);
            console.log("orders ====>", orders);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Display All Products Initially
    useEffect(() => {
        fetchDeliveredOrders();
    }, [])

    return (
        <>

            {/* {loading && <BackDropLoader />} */}

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
                        <input type="search" className='ms-auto form-control mb-4 border-0 rounded-none py-2 focus:shadow-none' placeholder='Search Orders' />
                    </div>
                </div>
                {
                    orders.length > 0 ?
                        <OrderHistoryItems orders={orders} />
                        :
                        <div className='d-flex align-items-center justify-content-center text-center'>
                            <div>
                                <p className='text-gray-500'>There is no orders.</p>
                            </div>
                        </div>
                }
            </div>

        </>
    )
}

export default OrderHistory
