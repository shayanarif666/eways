import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';
import { useSelector } from 'react-redux';

const PrevAddress = ({ addressID, setID, status }) => {

    // State Variables
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get Token
    const { token } = useSelector((state) => state.auth);

    // Get User Addresses
    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const address = await orderService.getShipmentAddress(token);
            setAddresses(address)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, [status])

    // Address ID
    const handleAddressId = (addressID) => {
        setID(addressID);
        sessionStorage.setItem("addressId", JSON.stringify(addressID));
        localStorage.setItem("addressId", JSON.stringify(addressID))
    }

    return (
        <>
            <div className="border px-3 rounded-lg">
                {
                    addresses && addresses.reverse().map((address, i) => (
                        <>
                            <div class="form-check my-4">
                                <input
                                    class="form-check-input"
                                    onChange={() => handleAddressId(address.id)}
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1" 
                                />
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {address.address}
                                    </label>
                                    <span>
                                        {address.city}
                                    </span>
                                </div>
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <p>
                                        {address.address2}
                                    </p>
                                    <span>{address.zip}</span>
                                </div>
                            </div>
                            <hr className='text-gray-500 mb-3' />
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default PrevAddress
