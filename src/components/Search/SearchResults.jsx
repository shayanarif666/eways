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
                            <img style={{ height: "150px", objectFit: "cover" }} src={product.imgPath ? `https://admin.almehdisolutions.com/${product.imgPath}` : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"} className='w-100' alt="" />
                            <h4 className='font-small mb-3'>{product.title.slice(0, 30)}...</h4>
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
