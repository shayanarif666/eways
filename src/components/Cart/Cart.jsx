import React, { useEffect, useState } from 'react'
import { BackDropLoader, CartItems, OrderSummary } from '../index';
import { Link, useParams } from 'react-router-dom';
import cartService from '../../services/cartService';
import { Container, Grid } from '@mui/material';


function Cart() {

    // State Variables
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get Id Params
    const { userId } = useParams();

    // Get Cart Data
    const fetchCartData = async () => {
        setLoading(true);
        try {
            const { carts } = await cartService.getCart(userId);
            setCart(carts)

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    // Sub Total
    const subtotal = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Quantity Change
    const onChangeQuantity = async (e, id) => {

    }

    useEffect(() => {
        fetchCartData();
    }, [])

    return (
        <>
            {loading && <BackDropLoader />}

            {
                cart.length > 0 ? <Container>
                    <h4 className='mt-5 text-2xl'>Shopping Cart</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {cart[0].products?.map(product => (
                                <CartItems key={product.id} item={product} quantity={1} onQuantity={onChangeQuantity} />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <OrderSummary totalProducts={cart[0].totalProducts} subtotal={cart[0].total} shipping={5.00} tax={8.32} />
                        </Grid>
                    </Grid>
                </Container> : <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                    <div>
                        <p className='text-gray-500'>There is no items in your cart right now.</p>
                        <Link to={`/`} className='btn btn-danger rounded-none shadow mt-3'>Go Back To Shopping</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart
