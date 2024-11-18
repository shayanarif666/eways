import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaArrowDown } from "react-icons/fa";

function OrderHistoryItems({ orders, ...props }) {
    return (
        <>
            <TableContainer className='bg-white'>
                <Table className='rounded-xl'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span className='font-bold text-xs flex items-center'>Invoice <FaArrowDown className='ms-1' /></span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Order Status</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Payment Status</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Delivery Address</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Products</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.invoice}</TableCell>
                                <TableCell>
                                    <span className={`text-xs font-semibold px-3 py-1 ${order.status === "Cancelled" ? "text-red-600" : "text-green-600"} rounded-3xl ${order.status === "Cancelled" ? "bg-red-100" : "bg-green-100"}`}>{order.status}</span>
                                </TableCell>
                                <TableCell>
                                    <span className={`text-xs font-semibold px-3 py-1 ${order.paymentStatus === "Paid" ? "text-purple-600" : "text-blue-600"} rounded-3xl ${order.paymentStatus === "Paid" ? "bg-purple-100" : "bg-blue-100"}`}>{order.paymentStatus}</span>
                                </TableCell>
                                <TableCell>{order.deliveryAddress}</TableCell>
                                <TableCell>
                                    <div className="lg:flex items-center">
                                        <img className='max-h-10 lg:me-2' src={order.items[0].img} alt="" />
                                        <span className='block text-xs'>{order.items[0].title}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderHistoryItems
