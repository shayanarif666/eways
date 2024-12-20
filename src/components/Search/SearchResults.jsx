import React from 'react';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchResults({
    products,
    searchValue,
    updateSearch
}) {
    const navigate = useNavigate();

    // Navigate
    const handleSearchNavigate = (search) => {
        navigate(`/product-detail/${search}`);
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
                    {products?.slice(0, 5).map((product) => (
                        <div className='col-xl-4 col-lg-6 col-sm-4 col-6' key={`item-${product.id}-${product.id}`} onClick={() => handleSearchNavigate(product.sku_id)}>
                            <img src={product.imgPath ? product.imgPath : "https://qne.com.pk/cdn/shop/files/orgsize_48449WhatsApp_20Image_202024-11-22_20at_205.49.49_20PM.jpg?v=1732280955"} className='w-100' alt="" />
                            <h4 className='font-small mb-3'>{product.title}</h4>
                            <div className="flex items-center">
                                <del>
                                    <h5 className='font-semibold'>Rs.{product.old_price.toFixed(2)}</h5>
                                </del>
                                <h5 className='font-semibold text-red-600 ms-2'>Rs.{product.new_price.toFixed(2)}</h5>
                            </div>


                        </div>
                    ))}
                    <Divider className='bg-gray-600 mt-5 mb-3' />

                    <button className='font-bold uppercase text-sm'>Total Results ({products.length})</button>
                </div>
            }
        </>
    )
}

export default SearchResults
