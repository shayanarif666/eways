import React, { useEffect, useState } from "react";
import { BackDropLoader } from "../index"
import StepList from "../StepList";
import orderService from "../../services/orderService";
import { useSelector } from "react-redux";

const Tracking = () => {

  // State Variables
  const [tracking, setTracking] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  // Access Token
  const { token, userData } = useSelector((state) => state.auth);
  console.log("user", userData)

  // Tracking Order
  const fetchTracking = async () => {
    setLoading(true);
    try {
      const trackOrder = await orderService.trackOrder(token);
      setTracking(trackOrder.reverse());
      setLoading(false);
      console.log("tracking ===>", trackOrder);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Get Tracking Address
  const fetchAddress = async () => {
    try {
      if (tracking.length > 0) {
        const orderAddress = await orderService.getShipmentAddress(token);
        const findAddress = orderAddress.find((address) => address.id === tracking[0].address_id);
        setAddress(findAddress);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Stepper
  const steps = [
    'CONFIRMED',
    'PACKED',
    'DELIVERED',
  ];

  useEffect(() => {
    fetchTracking();
  }, [])

  useEffect(() => {
    fetchAddress();
  }, [update])

  return (
    <>
      {loading && <BackDropLoader />}

      {
        tracking.length > 0 ? <div className="mx-auto bg-inherit rounded-none border p-6">
          <h1 className="text-xl font-bold mb-2">
            Order Number <span className="text-red-700">#{tracking[0].id}</span>
          </h1>
          <p className="text-gray-500 mb-6">Date: {tracking[0].created_at.slice(0, 10).replaceAll("-", "/")}</p>

          {/* Order Status */}
          <div className="my-5">
            <StepList stepper={steps} status={tracking[0].status - 1} />
          </div>

          {/* Shipping Details */}
          <div className="border-t border-b py-4 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Customer Details</h2>
              <p className="text-gray-600">Customer Name: {userData.first_name} {userData.last_name}</p>
              <p className="text-gray-600">Customer Email: {userData.user_name}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Address Details</h2>
              <p className="text-gray-600">Address: {address?.address}, {address?.address2}</p>
              <p className="text-gray-600">City: {address?.city}</p>
              <p className="text-gray-600">Zip Code: {address?.zip}</p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
            <div className="border-b py-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzDAkqV2j2-__LLrK039kkx0TyA9cog7wgA&s"
                  alt="Dior Tribales Earrings"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{tracking[0].sku.title?.slice(0, 30)}...</p>
                  <p className="text-gray-500">{tracking[0].sku.description?.slice(0, 70)}...</p>
                </div>
                <div>
                  <p>{tracking[0].sku.sku_name}</p>
                  <p className="font-semibold">${tracking[0].sku.new_price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="text-right">
            <p className="text-gray-600">Product Total: ${tracking[0].total_price.toFixed(2)}</p>
            <p className="text-gray-600">Shipping Cost: ${tracking[0].shipment_cost.toFixed(2)}</p>
            <p className="text-gray-600">Tax Cost: ${tracking[0].tax_amount.toFixed(2)}</p>
            {tracking[0].total_discount > 0 && <p className="text-gray-600">Discount: ${tracking[0].total_discount.toFixed(2)}</p>}
            <p className="text-lg font-bold">Total: ${tracking[0].total_amount_paid.toFixed(2)}</p>
          </div>
        </div>
          :
          <div className='d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='text-gray-500'>No Order Place Right Now.</p>
            </div>
          </div>
      }
    </>
  )
}

export default Tracking
