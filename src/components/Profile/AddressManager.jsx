import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import orderService from '../../services/orderService';
import { BackDropLoader } from "../index";

const AddressManager = ({
    isForm,
    setForm,
    isEdit,
    setEdit,
    id,
    setId
}) => {

    // State Variables
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    // Get Token
    const { token } = useSelector((state) => state.auth);

    // Get Address 
    const getAddress = async () => {
        setLoading(true);
        try {
            const addresses = await orderService.getShipmentAddress(token);
            setAddress(addresses);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Edit Address Form
    const handleEditForm = (isEditForm, id) => {
        setForm(true);
        setEdit(isEditForm);
        setId(id);
    }

    // Delete Address
    const handleDeleteAddress = async (id) => {
        setLoading(true)
        try {
            const deleteAdd = await orderService.deleteShipmentAddress(token, id);
            setLoading(false);
            setIsUpdate(!isUpdate);
            console.log(deleteAdd);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddress();
    }, [isUpdate])

    return (
        <>
            <div className="container mx-auto">
                <div className="row g-3">

                    {loading && <BackDropLoader />}

                    {
                        address && address.reverse().map((add) => (
                            <>
                                <div className="col-6">
                                    {/* Default Shipping Address */}
                                    <div className="border">
                                        <CardContent>
                                            <div className="mt-2">
                                                <p><strong>Street Address 1: </strong> {add.address}</p>
                                                <p><strong>Street Address 2: </strong> {add.address2}</p>
                                                <p><strong>City: </strong> {add.city}</p>
                                                <p><strong>Zip Code: </strong> {add.zip}</p>
                                            </div>
                                            <button onClick={() => handleEditForm(true, add.id)} className="text-black uppercase mt-3 font-sans hover:bg-gray-200 p-2">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteAddress(add.id)} className="text-red-600 hover:text-red-600 uppercase mt-3 font-sans hover:bg-red-100 p-2">
                                                Delete
                                            </button>
                                        </CardContent>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>

                {/* Add New Address Button */}
                <div className="flex justify-between mt-6">
                    <button onClick={() => handleEditForm(false, null)} className='bg-red-800 hover:bg-red-900 text-white px-3 py-2'>
                        Add Address
                    </button>
                </div>
            </div >
        </>
    )
}

export default AddressManager
