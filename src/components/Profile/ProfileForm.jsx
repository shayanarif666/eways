import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';
import { useSelector } from 'react-redux';
import BackDropLoader from '../Loader/BackDropLoader';
import toast, { Toaster } from 'react-hot-toast';

function ProfileForm({
    isForm,
    setForm,
    isEdit,
    id
}) {

    // State Variables
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(null);
    const [postAdd, setPostAdd] = useState("");
    const [streetAdd, setStreetAdd] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");

    // Get Token
    const { token } = useSelector((state) => state.auth);

    // Get Address Detail
    const fetchAddress = async () => {
        setLoading(true);
        try {
            const addresses = await orderService.getShipmentAddress(token);
            const findAddress = addresses.find((address) => address.id === id);
            setAddress(findAddress);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Save Address
    const handleSaveAddress = async (e) => {
        e.preventDefault();
        try {
            const updateAddress = {
                id,
                address: postAdd ? postAdd : address?.address,
                address2: streetAdd ? streetAdd : address?.address2,
                zip: zip ? zip : address?.zip,
                city: city ? city : address?.city,
                additional_notes: "string"
            }
            const resp = await orderService.updateShipmentAddress(token, updateAddress);
            setForm(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Add Address
    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            if (postAdd && streetAdd && city && zip) {
                const newAddress = {
                    id: 0,
                    address: postAdd,
                    address2: streetAdd,
                    zip: zip,
                    city: city,
                    additional_notes: "string"
                }
                console.log(newAddress)
                const resp = await orderService.addShipmentAddress(newAddress, token);
                setForm(false);
            } else {
                // Notification Msg
                toast.error("All Fields Required", {
                    position: "bottom-right",
                    autoClose: 1500,
                    theme: "colored"
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isEdit) {
            fetchAddress();
        }
    }, [])

    return (
        <div className="container mx-auto mt-5  p-4 border">
            <h4 className="mb-4 text-lg font-bold">Contact Information</h4>

            {loading && <BackDropLoader />}

            <div className="row mb-4">
                <div className="col-md-12">
                    <h4 className="mb-4 text-lg font-bold">Address</h4>

                    <form action="" onSubmit={(e) => handleSaveAddress(e)}>
                        <div className="sm:flex">
                            <input
                                placeholder="Postal Address"
                                defaultValue={address && address.address}
                                className="mb-4 me-3 p-3 w-full"
                                onChange={(e) => setPostAdd(e.target.value)}
                            />
                            <input
                                placeholder="Street Address"
                                defaultValue={address && address.address2}
                                className="mb-4 me-3 p-3 w-full"
                                onChange={(e) => setStreetAdd(e.target.value)}
                            />
                        </div>
                        <div className="sm:flex">
                            <input
                                placeholder="Zip Code"
                                defaultValue={address && address.zip}
                                className="mb-4 me-3 p-3 w-full"
                                onChange={(e) => setZip(e.target.value)}
                            />
                            <input
                                placeholder="City"
                                defaultValue={address && address.city}
                                className="mb-4 me-3 p-3 w-full"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        {
                            isEdit ? <button onClick={handleSaveAddress} className='bg-red-600 hover:bg-red-700 py-2 px-3 text-white font-semibold'>
                                Save Address
                            </button>
                                :
                                <button onClick={handleAddAddress} className='bg-red-600 hover:bg-red-700 py-2 px-3 text-white font-semibold'>
                                    Add Address
                                </button>
                        }
                        <Toaster />
                    </form>

                </div>
            </div>

        </div>
    )
}

export default ProfileForm
