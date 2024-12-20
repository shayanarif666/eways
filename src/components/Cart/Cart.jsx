import React, { useEffect, useState } from 'react'
import { BackDropLoader, CartItems, Login, OrderSummary } from '../index';
import { Link, useParams } from 'react-router-dom';
import cartService from '../../services/cartService';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';


function Cart() {

    // State Variables
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isRemove, setIsRemove] = useState(false);

    // Get Id Params
    const { userId } = useParams();

    const { token } = useSelector((state) => state.auth);

    // Get Cart Data
    const fetchCartData = async () => {
        setLoading(true);
        try {

            const carts = await cartService.getCart(token) || [];
            setCart(carts);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    // Sub Total
    const subtotal = cart?.reduce((acc, item) => acc + (item.sku.new_price * item.quantity), 0);

    // Update Cart
    const handleUpdateCart = async (e, cartId) => {
        setIsRemove(false);
        setQuantity(parseInt(e.target.value));
        try {
            const cartData = {
                cartId,
                quantity: parseInt(e.target.value)
            }
            const updateCart = await cartService.updateCart(cartData, token);
            setIsRemove((prevVal) => !prevVal);
        } catch (error) {
            console.log(error)
        }
    }

    // Remove Item From Cart
    const handleRemoveCart = async (cartId) => {
        setIsRemove(false);
        try {
            const deleteCart = await cartService.deleteCart(cartId, token);
            // Notification Msg
            toast.success("Remove Product Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            setTimeout(() => {
                setIsRemove((prevVal) => !prevVal);
            }, 1800);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCartData();
    }, [quantity, isRemove])

    return (
        <>
            {loading && <BackDropLoader />}

            {
                cart.length > 0 ? <Container>
                    <h4 className='mt-5 text-2xl'>Shopping Cart</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {cart?.map(product => (
                                <CartItems key={product.id} item={product} quantity={product.quantity} onQuantity={(e) => handleUpdateCart(e, product.id)} onRemoveProduct={() => handleRemoveCart(product.id)} />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <OrderSummary totalProducts={cart.length} subtotal={subtotal} shipping={5.00} tax={10.00} />
                        </Grid>
                    </Grid>
                </Container> : <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                    <div>
                        <p className='text-gray-500'>There is no items in your cart right now.</p>
                        <Link to={`/`} className='btn btn-danger rounded-none shadow mt-3'>Go Back To Shopping</Link>
                    </div>
                </div>
            }

            <Toaster />
        </>
    )
}

export default Cart
