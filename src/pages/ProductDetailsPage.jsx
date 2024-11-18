import React from 'react'
import { Layout, ProductDetail } from '../components/index'

function ProductDetailsPage() {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                    <ProductDetail />
                </div>
            </Layout>
        </section>
    )
}

export default ProductDetailsPage
