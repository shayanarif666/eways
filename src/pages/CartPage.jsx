import React from 'react'
import { Cart, Layout } from '../components/index'

function CartPage() {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                    <Cart />
                </div>
            </Layout>
        </section>
    )
}

export default CartPage
