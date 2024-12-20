import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import congrat from "../assets/Images/Congratulations.jpg"
import invoiceService from '../services/invoiceService';
import orderService from '../services/orderService';
import cartService from '../services/cartService';
import { BackDropLoader } from './index';

const Success = () => {

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get Token
  const token = sessionStorage.getItem("token");
  const addressId = JSON.parse(sessionStorage.getItem("addressId"));
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const subtotal = JSON.parse(sessionStorage.getItem("subTotal"));

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      if (token) {
        if (!sessionId) return;

        try {
          const saveInvoice = await invoiceService.addInvoice(token, sessionId);
          console.log("saveInvoice ========>", saveInvoice)
          if (saveInvoice.success === true) {
            setMessage(saveInvoice.message);
            setStatus(true);
          } else {
            setMessage(saveInvoice.message);
            setStatus(false);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching or saving invoice:", error);
          setLoading(false);
        }
      }
    };
    fetchInvoice()
  }, [token]);

  const placeOrder = async () => {
    console.log("Order Generated")
    try {
      const order = {
        user_id: 0,
        tax: 10,
        total_price: subtotal,
        shipment_charges: 5,
        total_paid: Math.floor(subtotal + 10 + 5),
        discount: 0,
        address_id: addressId,
        extra_notes: "string",
        items: cart
      };
      const newOrder = await orderService.addOrder(order, token);
      console.log("add Order ========>", newOrder);
      // Stored Order ID
      localStorage.setItem("orderID", JSON.stringify("order ID : 1027"));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cart.length > 0 && addressId && !loading) {
      if (status) {
        Swal.fire({
          text: "Successsfully Recieve Your Payment",
          icon: "success"
        });

        // Add Order
        placeOrder();
      } else {
        Swal.fire({
          text: "OOPS! Your Payment not been recieved",
          icon: "error"
        });
      }
    }
  }, [status])

  return (
    <>
      <div className="container bg-white px-5">
        <div className="row flex items-center" style={{ height: "100vh" }}>
          {loading && <BackDropLoader />}
          {
            !loading &&
            <>
              <div className="col-lg-6">
                <h1 className='text-4xl font-bold capitalize'>{message}!</h1>
                <p className='text-gray-500 my-3 text-xs'>Thank You For Choosing Eways.</p>
                <Link to={`/`} className='bg-red-700 hover:bg-red-800 text-white px-3 py-2'>Go Back To Shopping</Link>
              </div>
              <div className="col-lg-6">
                <img src={congrat} className='w-100' alt="" />
              </div>
            </>
          }

        </div>
      </div>
    </>
  )
}

export default Success
