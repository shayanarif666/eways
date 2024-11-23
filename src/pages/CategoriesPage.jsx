import React from 'react';
import { AllCategories, Layout } from "../components/index";

const CategoriesPage = () => {
    return (
        <Layout>
            <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                <AllCategories />
            </div>
        </Layout>
    )
}

export default CategoriesPage
