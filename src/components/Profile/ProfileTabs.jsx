import React, { useEffect, useState } from 'react'
import { AddressManager, OrderHistory, ProfileForm, ProfileInformation, Tracking } from '../index';
import { fakeOrders } from '../Orders/FakeOrders';

const ProfileTabs = ({ selectedTab }) => {

    const [orders, setOrders] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [addressID, setAddressID] = useState(null);

    const getOrders = () => {
        try {
            const orders = fakeOrders;
            setOrders(orders)
        } catch (error) {

        }
    }



    // abs Content
    const content = [
        {
            title: "Account Information",
            details: (
                <ProfileInformation />
            ),
        },
        {
            title: "My Orders",
            details: (
                <OrderHistory />
            ),
        },
        {
            title: "Order Tracking",
            details: (
                <Tracking />
            ),
        },
        {
            title: "Address Book",
            details: (
                isForm ? <ProfileForm isForm={isForm} id={addressID} setId={setAddressID} setForm={setIsForm} isEdit={isEdit} setEdit={setIsEdit} /> 
                : 
                <AddressManager isForm={isForm} id={addressID} setId={setAddressID} setForm={setIsForm} isEdit={isEdit} setEdit={setIsEdit} />
            ),
        }
    ];

    useEffect(() => {
        getOrders();
    }, [])


    return (
        <>
            <div className="px-4">
                <h2 className="text-xl font-bold mb-4">{content[selectedTab].title}</h2>
                {content[selectedTab].details}
            </div>
        </>
    )
}

export default ProfileTabs
