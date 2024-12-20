import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const IsAuth = () => {

    const token = sessionStorage.getItem("token") || "";

    return (
        <> 
        {
            token ? <Outlet /> : <Navigate to={`/login`} />
        }
        </>
    )
}

export default IsAuth
