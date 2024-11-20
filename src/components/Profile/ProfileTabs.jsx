import React, { useEffect, useState } from 'react'
import { AddressManager, OrderHistoryItems, ProfileForm, ProfileInformation, WishlistItems } from '../index';
import { fakeOrders } from '../Orders/FakeOrders';
import { items } from '../Wishlist/fakeItems';

const ProfileTabs = ({ selectedTab }) => {

    const [orders, setOrders] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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
                <OrderHistoryItems orders={orders} />
            ),
        },
        {
            title: "Address Book",
            details: (
                isForm ? <ProfileForm isForm={isForm} setForm={setIsForm} isEdit={isEdit} setEdit={setIsEdit} /> 
                : 
                <AddressManager isForm={isForm} setForm={setIsForm} isEdit={isEdit} setEdit={setIsEdit} />
            ),
        },
        {
            title: "My Wishlist",
            details: (
                <WishlistItems items={items} />
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
