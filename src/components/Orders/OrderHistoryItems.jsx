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
                                <span className='font-bold text-xs flex items-center'>#No. <FaArrowDown className='ms-1' /></span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Order Status</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Payment Status</span>
                            </TableCell>
                            <TableCell>
                                <span className='font-bold text-xs'>Products</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-3xl bg-purple-100 text-purple-600`}>DELIVERED</span>
                                </TableCell>
                                <TableCell>
                                    <span className={`text-xs font-semibold px-3 py-1 text-blue-600 rounded-3xl bg-blue-100`}>PAID</span>
                                </TableCell>
                                <TableCell>
                                    <div className="lg:flex items-center">
                                        <img className='max-h-10 lg:me-2' src={order.imgPath ? order.imgPath : "https://www.orientmarketing.com.pk/wp-content/uploads/2020/07/ductless-air-conditioner.jpg"} alt="" />
                                        <span className='block text-xs'>{order.title?.slice(0, 30)}...</span>
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
