import React, { useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, Divider, Button, Drawer } from "@mui/material";
import { useParams } from 'react-router-dom';
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import FilterData from './FilterData';
import productService from '../../services/productService';
import "./css/product.css";
import { BackDropLoader, Page, ProductCard } from '../index';
import { Toaster } from 'react-hot-toast';

function FilterProducts() {

    const [loading, setLoading] = useState(true);
    const [filterData, setFilteredData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    // const [selectedRating, setSelectedRating] = useState([]);
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
            const { filteredData, total, length } = await productService.getProductsByCategories(key, page)
            setFilteredProducts(filteredData);
            setFilteredData(filteredData);
            setTotalPages(Math.ceil(length / total));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchingData();
        console.log(filteredProducts)
    }, [key, page])

    useEffect(() => {
        applyFilter();
    }, [selectedBrands, selectedPrice, sortOrder]);

    // Filter By Brands

    const filteredByBrands = (brand) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };
    // Filter By Ratings

    // const filteredByRatings = (rating) => {
    //     setSelectedRating(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
    // };

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

        // if (selectedRating.length) {
        //     filtered = filtered.filter(product => selectedRating.includes(Math.round(product.rating)));
        // }

        if (selectedPrice.minPrice && selectedPrice.maxPrice) {
            filtered = filtered.filter(product => product.new_price >= selectedPrice.minPrice && product.new_price <= selectedPrice.maxPrice);
        }

        if (sortOrder === 'lowToHigh') {
            filtered.sort((a, b) => b.new_price - a.new_price);
        } else if (sortOrder === 'highToLow') {
            filtered.sort((a, b) => a.new_price - b.new_price);
        }

        setFilteredProducts(filtered);
    };

    // Handle Pagination
    const handlePageChange = async (e, value) => {
        setPage(value);
    }

    // Handle Drawer
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="mx-auto container py-5">
            <div className="row g-5">

                <div className="col-lg-3 d-lg-block d-none border h-full py-4">

                    <h5 className='mb-4 fw-bold d-flex align-items-center'>Filters <IoFilterSharp className='ms-2' /></h5>
                    <FilterData
                        filteredProducts={filteredProducts}
                        filterData={filterData}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        updateMinPrice={setMinPrice}
                        updateMaxPrice={setMaxPrice}
                        updateBrands={filteredByBrands}
                        // updateRatings={filteredByRatings}
                        updatePrice={filteredByPrice}
                    />
                </div>

                <div className="col-lg-9 col-12">

                    <div className="row g-3">
                        <div className="col-lg-3">

                        </div>
                    </div>

                    <div className="row g-3 d-flex align-items-center justify-content-between">
                        <div className="col-lg-5 col-12">
                            <p style={{ fontSize: ".9rem" }}>
                                {filteredProducts?.length} items found for
                                <span style={{ color: "#b30006" }}> "{filteredProducts[0]?.category_name}"</span>
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
                                        // updateRatings={filteredByRatings}
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
                                <ProductCard product={product} className="col-sm-6 col-md-4 col-xl-3 col-lg-6 col-xl-4 col-xxl-3 col-12" isDescription={true} />
                            ))
                                : <p className='text-center'>Sorry No Products Found</p>
                        }
                    </div>

                    <Toaster />

                    {
                        filteredProducts && <div className="pagination mt-5">
                            <Page totalPages={totalPages} handlePageChange={handlePageChange} />
                        </div>
                    }

                </div>

            </div>
        </div >
    )
}

export default FilterProducts
