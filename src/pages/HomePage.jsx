import React, { useEffect, useState } from 'react'
import { CategoriesList, Layout, Slider, WhyShopWithUs } from "../components/index"
import categoryService from '../services/categoryService';
import Products from '../components/Products/Products';

function HomePage() {

    const [categories, setCategories] = useState([]);

    // Get All Categories
    const getAllCategories = async () => {
        const getCategories = await categoryService.getCategories();
        setCategories(getCategories)
    }

    useEffect(() => {
        getAllCategories();
    }, [])


    return (
        <Layout>
            <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                <Slider />
                <CategoriesList categories={categories} />
                <Products />
                <WhyShopWithUs />
            </div>
        </Layout>
    )
}

export default HomePage
