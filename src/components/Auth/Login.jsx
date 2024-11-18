import React, { useState } from 'react'
import authService from '../../services/authServices'

function Login() {
    return (
        <div className='p-8'>
            <h1 className='text-2xl text-red-600'>Login To Your Account</h1>
            <form action="">
                <input type="name" className='form-control my-4' />
                <input type="password" className='form-control' />
                <button className='btn text-white bg-red-600 mt-3 hover:bg-red-700'>Login Account</button>
            </form>
        </div>
    )
}

export default Login
