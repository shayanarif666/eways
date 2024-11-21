import React from 'react'
import { Layout, Register } from '../components/index'

function RegisterPage() {
    return (
        <>
            <section style={{ backgroundColor: "#f7f7fa" }}>
                <Layout>
                    <div className="container py-28" style={{ height: "100%", paddingTop: "4rem" }}>
                        <Register />
                    </div>
                </Layout>
            </section>
        </>
    )
}

export default RegisterPage
