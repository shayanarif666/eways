import React from 'react'
import { FilteredProducts, Layout } from '../components/index'

function FilteredProductsPage() {
    return (
        <Layout>
            <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                <FilteredProducts />
            </div>
        </Layout>
    )
}

export default FilteredProductsPage
