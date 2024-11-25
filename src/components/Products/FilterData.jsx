import { Rating } from '@mui/material';
import React from 'react';

function FilterData({
    filteredProducts,
    filterData = [],
    minPrice,
    maxPrice,
    updateMinPrice,
    updateMaxPrice,
    updateBrands,
    updateWarrenty,
    updateRatings,
    updatePrice
}) {

    return (
        <>
            {
                filteredProducts && filteredProducts[0]?.brand ? <>
                    <h6 className='mb-2'>Brands</h6>
                    <hr className='mb-2' />
                    <div className='mb-4'>
                        {filterData.reduce((uniqueBrands, product) => {
                            if (!uniqueBrands.includes(product.brand)) {
                                uniqueBrands.push(product.brand);
                            }
                            return uniqueBrands;
                        }, []).map((brand, id) => (
                            <div key={id}>
                                <input
                                    type="checkbox"
                                    onChange={() => updateBrands(brand)}
                                    id={brand}
                                    value={brand}
                                    className='mt-1'
                                />
                                <label htmlFor={id} style={{ fontSize: ".85rem" }} className='ms-2'>{brand}</label>
                            </div>
                        ))}
                    </div>
                </>
                    :
                    <></>
            }

            <h6 className='mb-2'>Warrenty period</h6>
            <hr className='mb-2' />
            <div className='mb-8'>
                {filterData.reduce((uniqueWarren, product) => {
                    if (!uniqueWarren.includes(product.warrantyInformation)) {
                        uniqueWarren.push(product.warrantyInformation);
                    }
                    return uniqueWarren;
                }, []).map((warrantyInformation, id) => (
                    <div key={id} className='d-flex align-items-center'>
                        <input
                            type="checkbox"
                            onChange={() => updateWarrenty(warrantyInformation)}
                            id={warrantyInformation}
                            value={warrantyInformation}
                            className='mt-1'
                        />
                        <label htmlFor={id} style={{ fontSize: ".85rem" }} className='ms-2'>{warrantyInformation}</label>
                    </div>
                ))}
            </div>

            <h6 className='mb-2'>Rating</h6>
            <hr className='mb-2' />
            <div className='ratings'>
                {
                    filterData.reduce((updateRating, product) => {
                        if (!updateRating.includes(Math.round(product.rating))) updateRating.push(Math.round(product.rating));
                        return updateRating
                    }, [])
                        .map((rating, id) => {
                            return (
                                <div key={id} className='d-flex align-items-center '>
                                    <input
                                        type="checkbox"
                                        style={{ marginBottom: "0.4rem" }}
                                        onChange={() => updateRatings(rating)}
                                        id={rating}
                                        value={rating}
                                        className='mt-1'
                                    />
                                    <label htmlFor={id} className='ms-2 d-flex align-items-center mb-1'>
                                        <h6 className='me-2' style={{ fontSize: ".85rem" }}>{Math.floor(rating)} Stars</h6>
                                        <Rating name="read-only" className='mt-1' style={{ fontSize: ".9rem", marginTop: "-.5rem", display: "flex" }} value={rating} readOnly />
                                    </label>
                                </div>
                            )
                        })
                }
            </div>

            <h6 className='mt-4 mb-2'>Price</h6>
            <hr />
            <div className='price-range d-flex align-items-center mt-4'>
                <input type="number" className='form-control me-2' value={minPrice} onChange={(e) => updateMinPrice(e.target.value)} style={{ borderRadius: "0%" }} placeholder='Min' />
                <span className='me-2 text-secondary' style={{ fontSize: ".9rem" }}>To</span>
                <input type="number" className='form-control me-2' value={maxPrice} onChange={(e) => updateMaxPrice(e.target.value)} style={{ borderRadius: "0%" }} placeholder='Max' />
                <button className='btn bg-red-800 hover:bg-red-900 text-white rounded-none' onClick={() => updatePrice(minPrice, maxPrice)} >Apply</button>
            </div>
        </>
    )
}

export default FilterData
