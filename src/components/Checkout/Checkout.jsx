import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Box, Divider } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { BackDropLoader, PrevAddress, Shipment, StepList } from "../index";
import orderService from '../../services/orderService';
import { useSelector } from 'react-redux';
import cartService from '../../services/cartService';
import { loadStripe } from '@stripe/stripe-js';
import "./css/checkout.css"
import { DotLoader } from 'react-spinners';

function Checkout() {

    // State Variables
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addressID, setAddressID] = useState(null);
    const [status, setStatus] = useState(false);

    // Get Token From Store
    const { token } = useSelector((state) => state.auth);

    // Get Data From Cart
    const fetchingCartData = async () => {
        setLoading(true);
        try {
            const carts = await cartService.getCart(token) || [];
            setCart(carts);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchingCartData();
    }, [])

    // subTotal
    const subtotal = cart?.reduce((acc, item) => acc + (item.sku.new_price * item.quantity), 0);

    // Add Shipment Address
    const handleShipment = async ({ zip, city, address, address2 }) => {
        setLoading(true);
        const shipment_address = {
            city,
            state_id: 1,
            zip,
            address,
            address2,
            additional_notes: ""
        }
        try {
            const shippingOrderAddress = await orderService.addShipmentAddress(shipment_address, token)
            // Notification Msg
            toast.success("New Address Save Successfull", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            if (shippingOrderAddress.message) {
                setStatus((prevStatus) => !prevStatus);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    // Payment Handling
    const handlePayment = async () => {
        if (addressID) {
            setLoading(true);
            const stripe = await loadStripe("pk_test_51NpRZkJgs29DePV5fLxjVsixWCY6EdcZwwZGKwVR5PGKl0JmOOLeOQxUu2ZugAHZqExXp7S1FSti6onqjL6A0suo00Er37EL6R");

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const transformedData = cart.map(item => ({
                sku: {
                    title: item.sku.title,
                    newPrice: item.sku.new_price
                },
                quantity: item.quantity
            }))

            const response = await fetch("https://api.almehdisolutions.com/api/Order/create-checkout-session  ", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(transformedData)
            });

            setLoading(false);

            const session = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId: session.resp
            });

            if (result.error) {
                console.log(result.error);
            }
        } else {
            // Notification Msg
            toast.error("Select Shipping Address", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
        }

    }

    // Steps For Placing Order
    const steps = [
        'Shipping',
        'Payment'
    ];

    // Save Data In Local Storage
    useEffect(() => {
        const transformedData = cart?.map(item => ({
            sku_id: item.sku.id,
            quantity: item.quantity,
            price: item.sku.new_price
        }));
        sessionStorage.setItem("cart", JSON.stringify(transformedData));
        sessionStorage.setItem("subTotal", subtotal);
        localStorage.setItem("cart", JSON.stringify(transformedData));
        localStorage.setItem("subTotal", subtotal);
    }, [cart]);


    return (
        <>

            {loading && <BackDropLoader />}

            <StepList />

            <Container sx={{ py: 4 }}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={8}>
                        <div className='bg-white p-4'>
                            <Shipment onShipment={handleShipment} />
                            <PrevAddress addressID={addressID} setID={setAddressID} status={status} />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>

                        <h4 className='text-lg mb-3 font-semibold'>Order Summary</h4>

                        <div className='bg-white p-4'>
                            <div className="cart-prod mb-10">
                                {
                                    cart && cart.map((product) => {
                                        const images = product.sku.imgPath.split(",");
                                        return (
                                            <>
                                                <div className='flex items-center'>
                                                    <img
                                                        src={`${product.sku.imgPath ? `https://admin.almehdisolutions.com/${images[0]}` : "https://qne.com.pk/cdn/shop/files/orgsize_484551280797-1.jpg?v=1733728810"}`}
                                                        className='w-20 h-20'
                                                        alt=""
                                                    />
                                                    <div className="prod-info ms-3">
                                                        <h6 className='text-xs'>{product.sku.title}</h6>
                                                        <span className='text-sm font-semibold'>${product.sku.new_price.toFixed(2)}</span>
                                                    </div>
                                                    <div className="prod-qnt ms-auto">
                                                        <span className='text-xs font-semibold'>Qty: {product.quantity}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <Divider />
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Subtotal</Typography>
                                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Shipping</Typography>
                                <Typography variant="body2">$5.00</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Taxes</Typography>
                                <Typography variant="body2">$10.00</Typography>
                            </Box>
                            <Divider />
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Total</Typography>
                                <Typography variant="body2">${(subtotal + 5.00 + 10.00).toFixed(2)}</Typography>
                            </Box>

                            <button
                                onClick={handlePayment}
                                className={`${loading ? "opacity-50" : ""} bg-red-700 px-${loading ? '5' : '3'} text-white hover:bg-red-800 font-semibold rounded-none shadow py-2 w-100 flex items-center justify-center`}
                            >
                                {loading ? <DotLoader size={20} color={"#fff"} /> : 'Place Your Order'}
                            </button>

                            <Toaster />
                        </div>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

export default Checkout