import React from 'react';
import { Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function SearchResults({
    products,
    searchValue,
    updateSearch
}) {
    const navigate = useNavigate();

    // Navigate
    const handleSearchNavigate = (search) => {
        navigate(`/products/${search}`);
        updateSearch("");
    }

    return (
        <>
            {
                searchValue && <div className='row g-4 mt-0'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: "5px",
                        padding: "1rem",
                        maxHeight: 500,
                        overflow: "auto"
                    }}
                    subheader={<li />}
                >
                    {products?.slice(0, 3).map((product) => (
                        <div className='col-lg-4 col-sm-4 col-6' key={`item-${product.id}-${product.id}`} onClick={() => handleSearchNavigate(product.category)}>
                            <img src={product.thumbnail} className='w-100' alt="" />
                            <h4 className='font-small mb-3'>{product.title}</h4>
                            <div className="flex items-center">
                                <del>
                                    <h5 className='font-semibold'>Rs.{product.price.toFixed(2)}</h5>
                                </del>
                                <h5 className='font-semibold text-red-600 ms-2'>Rs.{product.price.toFixed(2)}</h5>
                            </div>


                        </div>
                    ))}
                    <Divider className='bg-gray-600 mt-5 mb-3' />

                    <button onClick={() => handleSearchNavigate (products[0].category)} className='font-bold uppercase text-sm'>View All Results ({products.length})</button>
                </div>
            }
        </>
    )
}

export default SearchResults
