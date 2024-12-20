import React from 'react';
import { Divider, Grid, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { MdErrorOutline } from 'react-icons/md';
import { FaPlus } from "react-icons/fa";

const Shipment = ({
    onShipment
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <div className="p-2">
                {/* Shipping Address Section */}
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="flex items-center">
                    {/* Add Address Box */}
                    <div className="border-dashed border-2 border-blue-400 rounded-md w-100 h-32 flex flex-col items-center justify-center cursor-pointer shadow">
                        <button
                            type="button"
                            className="flex items-center justify-center bg-white text-blue-500 rounded-full w-10 h-10 mb-2 border border-blue-400"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            <FaPlus size={16} />
                        </button>
                        <span className="text-sm text-gray-500">Add New Address</span>
                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content p-4">
                                    <form action="" onSubmit={handleSubmit(onShipment)}>
                                        <h4 className='text-lg mb-3 font-semibold'>Delivery Information</h4>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField {...register("address", { required: true })} fullWidth label="Address" margin="normal" />
                                                {/* Error Handle */}
                                                {errors.address && <small className='text-danger flex items-center'><MdErrorOutline className='me-1' style={{ marginBottom: "-.1rem" }} />Address is required</small>}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField {...register("address2", { required: true })} fullWidth label="Apartment, suite, etc." margin="normal" />
                                                {/* Error Handle */}
                                                {errors.address2 && <small className='text-danger flex items-center'><MdErrorOutline className='me-1' style={{ marginBottom: "-.1rem" }} />Appartment is required</small>}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField {...register("city", { required: true })} fullWidth label="City" margin="normal" />
                                                {/* Error Handle */}
                                                {errors.city && <small className='text-danger flex items-center'><MdErrorOutline className='me-1' style={{ marginBottom: "-.1rem" }} />City is required</small>}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField {...register("zip", { required: true })} fullWidth label="Zip Code" margin="normal" />
                                                {/* Error Handle */}
                                                {errors.zip && <small className='text-danger flex items-center'><MdErrorOutline className='me-1' style={{ marginBottom: "-.1rem" }} />Zipcode is required</small>}
                                            </Grid>

                                            <button
                                                className='btn bg-red-800 hover:bg-red-900 text-white rounded-none shadow mb-4 mt-2 ms-auto'
                                                data-bs-dismiss="modal" 
                                                aria-label="Close"
                                            >
                                                Add Address
                                            </button>
                                        </Grid>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <hr className='text-gray-500 bg-gray-500 w-100 mt-3' />
                    <span className='text-gray-500 mt-3 mx-3'>or</span>
                    <hr className='text-gray-500 bg-gray-500 w-100 mt-3' />
                </div>
            </div>
        </>
    )
}

export default Shipment;
