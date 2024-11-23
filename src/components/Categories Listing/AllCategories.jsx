import React, { useEffect, useState } from 'react'
import categoryService from '../../services/categoryService'
import BackDropLoader from '../Loader/BackDropLoader';
import { Link } from 'react-router-dom';
import { categoryIcons } from './CategoryIcons';

const AllCategories = () => {

    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);

    // Get All Categories
    const fetchingAllCategories = async () => {
        setLoading(true);
        try {
            const categories = await categoryService.getCategories();
            setCategories(categories);
            console.log(categories)
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchingAllCategories();
    }, [])

    return (
        <>

            {/* Loading State */}
            {
                loading && <BackDropLoader />
            }

            {/* Error State */}
            {
                error && <p className='text-red-600'>{error}</p>
            }

            {/* Data */}
            <div className="row py-6">
                <h3 className='text-2xl text-black text-center mb-4'>All Categories</h3>
                {
                    categories && categories.map(({ slug, name }) => (
                        <div className='col-md-4 col-sm-6 bg-white border p-4 text-center'>
                            <Link to={`/products/${slug}`}>
                                <div className="category-img">
                                    <img src={categoryIcons[slug]} className='mx-auto mb-4 h-64 object-contain' alt={slug} />
                                </div>
                                <h4 className="uppercase category-title font-semibold font-sans text-3xl text-sky-700">{name}</h4>
                            </Link>
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default AllCategories
