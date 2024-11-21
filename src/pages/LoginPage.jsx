import React from 'react'
import { Layout, Login } from '../components/index'

const LoginPage = () => {
    return (
        <section style={{ backgroundColor: "#f7f7fa" }}>
            <Layout>
                <div className="container py-28" style={{ height: "100%", paddingTop: "4rem" }}>
                    <Login />
                </div>
            </Layout>
        </section>
    )
}

export default LoginPage
