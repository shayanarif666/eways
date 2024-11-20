import React from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const AddressManager = ({
    isForm,
    setForm,
    isEdit,
    setEdit
}) => {

    const handleEditForm = (isEditForm) => {
        setForm(true);
        setEdit(isEditForm);
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Default Shipping Address */}
                    <div className="border">
                        <CardContent>
                            <div className="mt-2">
                                <p>Muhammad Shayan</p>
                                <p>Street 32 near Aptech Plot # 25</p>
                                <p>Nazimabad - Block 1, Karachi, Sindh, Pakistan</p>
                                <p>T: 03162196345</p>
                            </div>
                            <button onClick={() => handleEditForm(true)} className="text-black uppercase mt-4 font-sans hover:bg-gray-200 p-2">
                                Edit
                            </button>
                            <button to={``} className="text-red-600 hover:text-red-600 uppercase mt-4 font-sans hover:bg-red-100 p-2">
                                Delete
                            </button>
                        </CardContent>
                    </div>
                </div>

                {/* Add New Address Button */}
                <div className="flex justify-between mt-6">
                    <button onClick={() => handleEditForm(false)} className='bg-red-600 hover:bg-red-700 text-white px-3 py-2'>
                        Add Address
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddressManager
