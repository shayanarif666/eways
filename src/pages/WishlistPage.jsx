import React from 'react';
import { Layout, Wishlist } from '../components/index'

function WishlistPage() {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                    <Wishlist />
                </div>
            </Layout>
        </section>
    )
}

export default WishlistPage
