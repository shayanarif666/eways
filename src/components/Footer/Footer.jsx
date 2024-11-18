import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer-container shadow-lg pt-5 mt-4">
            <div className="container mx-auto">
                <div className="row">

                    <div className="footer-section col">
                        <h4>Customer Care</h4>
                        <ul>
                            <li>Help Center</li>
                            <li>How to Buy</li>
                            <li>Corporate & Bulk Purchasing</li>
                            <li>Returns & Refunds</li>
                            <li>Shopaholics Shop</li>
                            <li>Contact Us</li>
                            <li>Purchase Protection</li>
                            <li>Shopaholics Pick up Points</li>
                        </ul>

                        <div style={{ marginTop: "2rem" }}>
                            <h4>Make Money With Us</h4>
                            <ul>
                                <li>Shopaholics University</li>
                                <li>Sell on Shopaholics</li>
                                <li>Join Shopaholics Affiliate Program</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-section col">
                        <h4>Shopaholics</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Digital Payments</li>
                            <li>Shopaholics Donates</li>
                            <li>Shopaholics Blog</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>NTN Number : 4012118-6</li>
                            <li>STRN Number : 1700401211818</li>
                            <li>Online Shopping App</li>
                            <li>Online Grocery Shopping</li>
                            <li>Shopaholics Exclusive</li>
                        </ul>
                    </div>

                    <div className="footer-section col">
                        <h4>Mail Us</h4>
                        <div className="mail">
                            <address className='d-block' style={{ fontSize: ".8rem", color: "#111", lineHeight: "1.5rem" }}>
                                Shopaholics Internet Private limited, <br />
                                Business Arcade, Shahrah-e-Faisal <br /> Block 6 P.E.C.H.S., Karachi, Sindh.
                            </address>
                        </div>

                        <div className="register-office mt-5">
                            <h4>Register Office</h4>
                            <address className='d-block' style={{ fontSize: ".8rem", color: "#111", lineHeight: "1.5rem" }}>
                                Shopaholics Internet Private limited, <br />
                                Business Arcade, Shahrah-e-Faisal <br /> Block 6 P.E.C.H.S., Karachi, Sindh. <br />
                                <span>CIN : UYE873726JUDGTFSF</span> <br />
                                <span>Telephone : <a href="" className='text-decoration-none'>+92 37638202862</a></span>
                            </address>
                        </div>
                    </div>

                    <div className="footer-section col">
                        <h4>Help</h4>
                        <ul>
                            <li>Help Center</li>
                            <li>How to Buy</li>
                            <li>Corporate & Bulk Purchasing</li>
                            <li>Returns & Refunds</li>
                        </ul>

                        <div className="footer-icons mt-5 d-lg-block d-none">
                            <h4>Follow Us</h4>
                            <div className="social-icons mt-4">
                                <FaFacebook style={{ color: "#3272d9" }} />
                                <FaTwitter style={{ color: "#489ae9" }} />
                                <FaInstagram style={{ color: "#eb3d62" }} />
                                <FaGlobe style={{ color: "#f8540b" }} />
                                <FaYoutube style={{ color: "#e12b1e" }} />
                            </div>
                        </div>
                    </div>

                    <div className="footer-section col  d-lg-none d-block">
                        <div className="footer-icons">
                            <h4>Follow Us</h4>
                            <div className="social-icons mt-4">
                                <FaFacebook style={{ color: "#3272d9" }} />
                                <FaTwitter style={{ color: "#489ae9" }} />
                                <FaInstagram style={{ color: "#eb3d62" }} />
                                <FaGlobe style={{ color: "#f8540b" }} />
                                <FaYoutube style={{ color: "#e12b1e" }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;