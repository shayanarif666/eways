import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import cartService from '../../services/cartService';

function CartItems({ item, quantity, onQuantity, onRemoveProduct }) {
    
    // State Variables
    const [images, setImages] = useState([]);

    useEffect(() => {
        const images = item.sku.imgPath.split(",");
        setImages(images);
        console.log("path", images[0])
    }, [])

    console.log(item)
    return (
        <>
            <Grid container sx={{ p: 2, mt: 3, mb: 2 }} className='cart-item bg-white'>
                <Grid item sm={3} xs={12} className='me-4 sm:mb-0 mb-3'>
                    <img
                        alt={"image"}
                        src={item.sku.imgPath ? `https://admin.almehdisolutions.com/${images[0]}`: "https://qne.com.pk/cdn/shop/files/orgsize_25679golden_20sun.png?v=1732019447"}
                        className='w-full'
                    />
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Typography variant="subtitle1"><strong>{item.sku.title.slice(0, 50)}...</strong></Typography>
                    <Typography className="my-2" variant="body1">{item.sku.description.slice(0, 80)}...</Typography>
                    <Typography variant="body1">$ {item.sku.new_price.toFixed(2)}</Typography>

                    <Box mt={1}>
                        {item.inStock ? (
                            <Typography variant="body2" color="success.main">In stock</Typography>
                        ) : (
                            <Typography variant="body2" color="error.main">{item.shippingInformation}</Typography>
                        )}
                    </Box>
                    <Box className="d-sm-flex align-items-sm-center">
                        <select className='form-select mt-2' style={{ width: '70px', borderRadius: 0 }} defaultValue={quantity} onChange={onQuantity}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className='btn btn-danger rounded-none shadow ms-sm-2 mt-2' onClick={onRemoveProduct}>Remove From Cart</button>
                    </Box>
                </Grid>
            </Grid>

            <Toaster />
        </>
    )
}

export default CartItems
