import React from 'react';
import './footer.css';
import { Box, TextField, Button, Typography } from "@mui/material";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import cashapp from "../../assets/Images/Payment Gateway/cashapp.png";
import paypal from "../../assets/Images/Payment Gateway/paypal.png";
import visa from "../../assets/Images/Payment Gateway/visa.ico"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-white py-12">
            <div className="container mx-auto px-5">
                <div className="row">
                    {/* Contact Details */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <h4 className="font-bold mb-4 text-medium">
                            CONTACT DETAILS
                        </h4>
                        <ul>
                            <li className='mb-3 text-sm text-zinc-400 flex'>
                                <FaLocationDot className='mt-1 me-2' /> 156-157, Block 3, BYJCHS, Bahadurabad, Karachi, Pakistan</li>
                            <li className='mb-3 text-sm text-zinc-400 flex'>
                                <FaLocationDot className='mt-1 me-2' /> Shop # GF 16 & FF 09, Safa Mall, Ziarat line, Malir Cantonment, Karachi, Pakistan</li>
                            <li className='mb-3 text-sm text-zinc-400 flex'>
                                <IoCall className='mt-1 me-2' />(021) 111-624-333 (111-NAHEED)</li>
                            <li className='mb-3 text-sm text-zinc-400 flex'>
                                <LuClock4 className='mt-1 me-2' />Customer Support: 7 Days a Week, 9:00 AM - 10:00 PM</li>
                        </ul>
                    </div>

                    {/* Customer Services */}
                    <div className="col-xl-2 col-md-6 mb-4">
                        <h4 className="font-bold mb-4 text-medium">
                            CUSTOMER SERVICES
                        </h4>
                        <ul className="space-y-2">
                            <li className='text-sm text-zinc-400 mb-3'>
                                <Link to={`/form`} className='text-gray-400 hover:text-zinc-200 text-decoration-none'>Contact Us</Link>
                            </li>
                            <li className='text-sm text-zinc-400 mb-3'>
                                <Link to={"/about"} color="inherit" className='hover:text-zinc-200 text-decoration-none'>About</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="col-xl-2 col-md-6 mb-4">
                        <h4 className="font-bold mb-4 text-medium">
                            INFORMATION
                        </h4>
                        <ul className="space-y-2">
                            <li className='text-sm text-zinc-400 mb-3'>
                                <Link to={"/privacy-policy"} color="inherit" className='hover:text-zinc-200 text-decoration-none'>Privacy Policy</Link>
                            </li>
                            <li className='text-sm text-zinc-400 mb-3'>
                                <Link to={"/terms"} color="inherit" className='hover:text-zinc-200 text-decoration-none'>Terms & Conditions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-xl-5 col-md-6 mb-4">
                        <h4 className="font-bold mb-4 text-medium">
                            SUBSCRIBE OUR NEWSLETTER
                        </h4>
                        <p className="text-medium mb-3">
                            Get the <strong>latest offers</strong> and promotions!
                        </p>
                        <div className="sm:flex items-center">
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Enter your email"
                                className="bg-white flex-grow w-100"
                            />
                            <button className="bg-red-800 hover:bg-red-900 py-2 px-3 text-white font-semibold">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex space-x-3 mt-5">
                            <FaFacebookF className="text-3xl cursor-pointer bg-blue-500 text-2xl p-1" />
                            <FaInstagram className="text-3xl cursor-pointer bg-pink-500 text-2xl p-1" />
                            <FaTiktok className="text-3xl cursor-pointer bg-gray-500 text-2xl p-1" />
                            <FaLinkedin className="text-3xl cursor-pointer bg-sky-800 text-2xl p-1" />
                            <FaYoutube className="text-3xl cursor-pointer bg-red-500 text-2xl p-1" />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700 my-5" />

                {/* Footer Bottom */}
                <div className="sm:flex justify-between items-center">
                    <p className="text-sm">Copyright © 2024 Eways.pk. All rights reserved.</p>
                    <div className="flex space-x-3 sm:mt-0 mt-2">
                        <img src={cashapp} alt="CashApp" className="h-6" />
                        <img src={paypal} alt="Paypal" className="h-6" />
                        <img src={visa} alt="Visa" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;