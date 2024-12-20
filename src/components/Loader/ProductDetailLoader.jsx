import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Grid } from '@mui/material';

function ProductDetailLoader() {
    return (
        <Container className='py-6'>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={500} height={500} />
                        <div className='d-flex align-items-center'>
                            <Skeleton variant="rectangular" className='me-3' width={100} height={100} />
                            <Skeleton variant="rectangular" className='me-3' width={100} height={100} />
                            <Skeleton variant="rectangular" className='me-3' width={100} height={100} />
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: 500 }}>
                        <Skeleton animation="wave" sx={{ py: 1 }} />
                        <Skeleton animation="wave" width={250} />
                        <Skeleton animation="wave" sx={{ mb: 3 }} width={130} />

                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" width={250} sx={{ mb: 3 }} />

                        <div className='d-flex align-items-center'>
                            <Skeleton animation="wave" width={150} sx={{ mr: 2, p: 1 }} />
                            <Skeleton animation="wave" width={150} sx={{ p: 1 }} />
                        </div>

                        <div className='d-flex align-items-center'>
                            <Skeleton animation="wave" width={150} sx={{ mr: 2, p: 1 }} />
                            <Skeleton animation="wave" width={150} sx={{ p: 1 }} />
                        </div>

                        <div className='d-flex align-items-center'>
                            <Skeleton animation="wave" width={150} sx={{ mr: 2, p: 1 }} />
                            <Skeleton animation="wave" width={150} sx={{ p: 1 }} />
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetailLoader