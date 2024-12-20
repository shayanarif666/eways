export class OrderService {
    constructor() { }

    // Get Order By User
    async getOrdersByUser(userID) {

    }

    // Add Order
    async addOrder(order, token) {
        console.log(order, token)
        const url = 'https://api.almehdisolutions.com/api/Order/AddOrder';
        const options = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }, 
            body: JSON.stringify(order) 
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: ADD Order", error);
        }
    }

    // Track Order
    async trackOrder(token) {
        const url = 'https://api.almehdisolutions.com/api/Order/GetCuurentUserOrder';
        const options = { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: ADD Order", error);
        }
    }

    // Delivered Orders
    async deliveredOrders(token) {
        const url = 'https://api.almehdisolutions.com/api/Order/GetConfirmOrderProduct';
        const options = { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: ADD Order", error);
        }
    }

    // Add Order Address / Shipment
    async addShipmentAddress(address, token) {
        console.log(address, token)
        const url = 'https://api.almehdisolutions.com/api/Order/AddShipment';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            body: JSON.stringify(address)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: ADD Address", error);
        }
    }

    // Get Address / Shipment
    async getShipmentAddress(token) {
        console.log(token)
        const url = 'https://api.almehdisolutions.com/api/Order/GetShipment';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({})
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: GET Address", error);
        }
    }

    // Update Address / Shipment
    async updateShipmentAddress(token, address) {
        console.log(token, address)
        const url = 'https://api.almehdisolutions.com/api/Order/UpdateShipment';
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(address)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: GET Address", error);
        }
    }

    // Delete Address / Shipment
    async deleteShipmentAddress(token, id) {
        console.log(token, id)
        const url = `https://api.almehdisolutions.com/api/Order/DeleteShipment?shipment_id=${id}`;
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: GET Address", error);
        }
    }
}

const orderService = new OrderService();

export default orderService;