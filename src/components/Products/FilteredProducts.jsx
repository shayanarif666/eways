import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Rating, Box, InputLabel, MenuItem, FormControl, Select, Divider, Stack, Pagination, Button, Drawer } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import FilterData from './FilterData';
import productService from '../../services/productService';
import "./css/product.css";
import { BackDropLoader } from '../index';

function FilterProducts() {

    const [loading, setLoading] = useState(true);
    const [filterData, setFilteredData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedWarrenty, setSelectedWarrenty] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState({ minPrice: null, maxPrice: null });
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [open, setOpen] = useState(false);

    const { key } = useParams();

    // Get Products
    const fetchingData = async () => {
        setLoading(true);
        try {
            const { products } = await productService.getProductsByCategories(key)
            setFilteredProducts(products);
            setFilteredData(products);
            setTotalPages(Math.ceil(products.length / 5));

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchingData();
    }, [key, page])

    useEffect(() => {
        applyFilter();
    }, [selectedBrands, selectedRating, selectedPrice, sortOrder, selectedWarrenty]);

    // Filter By Brands

    const filteredByBrands = (brand) => {
        console.log(brand)
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    // Filter By Warrenty

    const filteredByWarrenty = (warrenty) => {
        setSelectedWarrenty(prev => prev.includes(warrenty) ? prev.filter(w => w !== warrenty) : [...prev, warrenty]);
    };

    // Filter By Ratings

    const filteredByRatings = (rating) => {
        setSelectedRating(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
    };

    // Filter By Price

    const filteredByPrice = (min, max) => {
        setSelectedPrice({ minPrice: min, maxPrice: max });
    };

    // Sort By Price

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Applying Filter
    const applyFilter = () => {
        let filtered = filterData;

        if (selectedBrands.length) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }

        if (selectedWarrenty.length > 0) {
            filtered = filtered.filter(product => selectedWarrenty.includes(product.warrantyInformation));
        }

        if (selectedRating.length) {
            filtered = filtered.filter(product => selectedRating.includes(Math.round(product.rating)));
        }

        if (selectedPrice.minPrice && selectedPrice.maxPrice) {
            filtered = filtered.filter(product => product.price >= selectedPrice.minPrice && product.price <= selectedPrice.maxPrice);
        }

        if (sortOrder === 'lowToHigh') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'highToLow') {
            filtered.sort((a, b) => a.price - b.price);
        }

        setFilteredProducts(filtered);
    };

    // Discount Percentage
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    // Handle Pagination
    const handlePageChange = async (e, value) => {
        setPage(value);
        console.log(value)
    }

    // Handle Drawer
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="mx-auto container py-5">
            <div className="row g-5">

                <div className="col-lg-3 d-lg-block d-none">

                    <h5 className='mb-4 fw-bold d-flex align-items-center'>Filters <IoFilterSharp className='ms-2' /></h5>
                    <FilterData
                        filteredProducts={filteredProducts}
                        filterData={filterData}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        updateMinPrice={setMinPrice}
                        updateMaxPrice={setMaxPrice}
                        updateBrands={filteredByBrands}
                        updateWarrenty={filteredByWarrenty}
                        updateRatings={filteredByRatings}
                        updatePrice={filteredByPrice}
                    />
                </div>

                <div className="col-lg-9 col-12">

                    <div className="row g-3 d-flex align-items-center justify-content-between">
                        <div className="col-lg-5 col-12">
                            <p style={{ fontSize: ".9rem" }}>
                                {filteredProducts?.length} items found for
                                <span style={{ color: "orangered" }}> "{key[0].toUpperCase() + key.slice(1)}"</span>
                            </p>
                        </div>
                        <div className="mb-4 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="sort-label">Sort By Price</InputLabel>
                                    <Select
                                        labelId="sort-label"
                                        id="sort-select"
                                        value={sortOrder}
                                        label="Sort By Price"
                                        onChange={(e) => handleSortChange(e)}
                                    >
                                        <MenuItem value="lowToHigh">Price Low To High</MenuItem>
                                        <MenuItem value="highToLow">Price High To Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="d-lg-none d-block col-md-3 col-sm-6 col-6 text-end">
                            <Button onClick={toggleDrawer(true)}>
                                <IoFilterSharp style={{ fontSize: "1.8rem", marginTop: "-1.5rem", color: "#222" }} />
                            </Button>
                            <Drawer open={open}>
                                <Box sx={{ width: 300, padding: "2rem 1rem" }} role="presentation">
                                    <div className="text-end mx-3 flex justify-end">
                                        <RxCross2 style={{ color: "#999", fontSize: "1.8rem", cursor: "pointer", }} onClick={toggleDrawer(false)} />
                                    </div>
                                    <h5 className='fw-bold mb-4'>Filters</h5>
                                    <FilterData
                                        filteredProducts={filteredProducts}
                                        filterData={filterData}
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        updateMinPrice={setMinPrice}
                                        updateMaxPrice={setMaxPrice}
                                        updateBrands={filteredByBrands}
                                        updateWarrenty={filteredByWarrenty}
                                        updateRatings={filteredByRatings}
                                        updatePrice={filteredByPrice}
                                    />
                                </Box>
                            </Drawer>
                        </div>
                    </div>

                    <Divider style={{ backgroundColor: "#666" }} className='mb-2' />

                    <div className="row g-3">

                        {loading && <BackDropLoader />}

                        {
                            filteredProducts.length > 0 ? filteredProducts.map((product, id) => (
                                <div className="col-sm-6 col-md-4 col-xl-3 col-lg-4 col-12">
                                    <div className="card-box product-list shadow">
                                        <Card className='my-2 p-3' key={id}>
                                            <Link to={`/product-detail/${product.id}`} style={{ textDecoration: "none", color: "#333" }}>
                                                <div className='card-img'>
                                                    <CardMedia
                                                        component="img"
                                                        alt="green iguana"
                                                        height="150"
                                                        image={product.thumbnail}
                                                    />
                                                </div>

                                                <h5 className='mt-3' style={{ color: "#333", fontWeight: "600", fontSize: "1rem" }}>{product.title}</h5>
                                                <p className='mb-2' style={{ fontSize: ".75rem" }}>
                                                    {product.description.slice(0, 80)}...
                                                </p>

                                                <h6>Rs. {calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}</h6>
                                                {
                                                    product.discountPercentage ?
                                                        <div>
                                                            <del className='me-2'>Rs.{product.price}</del> <small>-{product.discountPercentage.toFixed(2)} % off</small>
                                                        </div>
                                                        : ""
                                                }
                                                <div className="rating d-flex align-items-center">
                                                    <Rating name="read-only" className='mt-2' value={product.rating} readOnly />
                                                    <small className='ms-1'>({product.rating} / 5)</small>
                                                </div>
                                            </Link>
                                        </Card>
                                    </div>
                                </div>
                            ))
                                : <p className='text-center'>Sorry No Products Found</p>
                        }
                    </div>

                    {
                        filteredProducts && <div className="pagination mt-5">
                            <Stack spacing={5}>
                                <Pagination count={totalPages} onChange={handlePageChange} variant="outlined" shape="rounded" size="small" style={{ color: "orange" }} />
                            </Stack>
                        </div>
                    }

                </div>

            </div>
        </div >
    )
}

export default FilterProducts
