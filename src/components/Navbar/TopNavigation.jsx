import React from 'react'

const TopNavigation = () => {
    return (
        <>
            <div className="bg-white">
                <div className="row">
                    <div className="col-6">
                        <marquee>FREE DELIVERY ON ORDER RS.1500/- OTHERWISE RS.125 DELIVERY CHARGES</marquee>
                    </div>
                    <div className="col-6">
                        <ul className='flex items-center justify-center mt-1'>
                            <li className='me-3 font-sm text-sm font-medium hover:underline'><a href="" className='hover:text-red-800'>Call Us: +92 21 3672 3280</a></li>
                            <li className='me-3 text-sm font-medium hover:underline'><a href="" className='hover:text-red-800'>Contact</a></li>
                            <li className='me-3 text-sm font-medium hover:underline'><a href="" className='hover:text-red-800'>Help</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNavigation
