import React from 'react';
import { Checkout, Layout } from '../components/index';

function CheckoutPage() {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container" style={{ height: "100%", paddingTop: "2rem" }}>
                    <Checkout />
                </div>
            </Layout>
        </section>
    )
}

export default CheckoutPage
