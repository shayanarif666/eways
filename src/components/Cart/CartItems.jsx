import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import cartService from '../../services/cartService';

function CartItems({ item, quantity, onQuantity }) {

    // Remove Cart
    const handleRemoveCart = async (productID) => {
        try {
            const removeCart = await cartService.deleteCart(productID, userID);
        } catch (error) {
            console.log(error)
        }
    }

    // Update Cart
    const handleUpdateCart = async (productID) => {
        try {
            const updateCart = await cartService.updateCart(productID, userID);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Grid container sx={{ p: 2, mt: 3, mb: 2 }} className='cart-item bg-white'>
                <Grid item xs={3} className='me-4'>
                    <img src={item.thumbnail} alt={item.image} style={{ width: '100%', height: '150px' }} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="subtitle1"><strong>{item.title}</strong></Typography>
                    <Typography className="my-2" variant="body1">{item.description} The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</Typography>
                    <Typography variant="body1">${item.price}</Typography>

                    <Box mt={1}>
                        {item.inStock ? (
                            <Typography variant="body2" color="success.main">In stock</Typography>
                        ) : (
                            <Typography variant="body2" color="error.main">{item.shippingInformation}</Typography>
                        )}
                    </Box>
                    <Box className="d-sm-flex align-items-sm-center">
                        <select className='form-select mt-2' style={{ width: '70px', borderRadius: 0 }} defaultValue={quantity} onChange={(e) => handleUpdateCart(item.id)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className='btn btn-danger rounded-none shadow ms-sm-2 mt-2' onClick={() => handleRemoveCart(item.id)}>Remove From Cart</button>
                    </Box>
                </Grid>
            </Grid>

            <Toaster />
        </>
    )
}

export default CartItems
