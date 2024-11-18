import React from 'react';
import { Header, Footer } from "../index";


function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
