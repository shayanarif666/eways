import React from "react";
import Layout from "./Layout/Layout";

const Form = () => {
    return (
        <Layout>
            <div className="container my-10" style={{ height: "100%", paddingTop: "2rem", maxWidth: "800px" }}>
                <div className="row">
                    <div className="col-12">

                        <h3 className="text-2xl text-red-700 font-bold">Have Any Query ?</h3>
                        <p className="mb-4 text-xs mt-1 text-gray-400">Feel Free To Contact Us.</p>

                        {/* Left Section - Form */}
                        <form style={{ flex: 1 }}>
                            <div className="sm:flex block" style={{ gap: "20px" }}>
                                <input
                                    type="text"
                                    className="w-100 sm:mb-0 form-input p-3"
                                    placeholder="First name"
                                />
                                <input
                                    type="text"
                                    className="w-100 p-3"
                                    placeholder="Last name"
                                />
                            </div>
                            <input
                                type="email"
                                className="form-input w-100 p-3 mt-3"
                                placeholder="Email"
                            />
                            <input
                                type="tel"
                                className="form-input w-100 my-3 p-3"
                                placeholder="Phone Number"
                            />
                            <textarea
                                placeholder="Leave us a message..."
                                rows="4"
                                className="form-input w-100 p-3"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-red-700 hover:bg-red-800 text-white px-3 py-2 mt-2 font-semibold"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Form;