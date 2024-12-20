export class CartService {
    constructor() { }

    // Get Carts
    async getCart(token) {
        const url = "https://api.almehdisolutions.com/api/Cart/GetCart";
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const cart = await response.json();
            return cart;
        } catch (error) {
            console.log("Server Service :: USER Cart", error);
        }
    }

    // Add Cart
    async addCart(cart, token) {

        console.log(cart, token)

        const url = 'https://api.almehdisolutions.com/api/Cart/AddToCart';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            body: JSON.stringify(cart)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const addCart = await response.json();
            return addCart;
        } catch (error) {
            console.log("Server Service :: ADD Cart", error);
        }
    }

    // Update Cart
    async updateCart({ cartId, quantity }, token) {
        const url = `https://api.almehdisolutions.com/api/Cart/UpdateCart?cartId=${cartId}&quantity=${quantity}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: {}
        };

        try {
            const res = await fetch(url, options);
            console.log(res)
            if (!res.ok) throw new Error("Something went wrong !");
            const updateCart = await res.json();
            return updateCart;
        } catch (error) {
            console.log("Server Service :: USER Cart", error);
        }
    }

    // Delete Cart
    async deleteCart(cartID, token) {
        const url = `https://api.almehdisolutions.com/api/Cart/RemoveFromCart?cartId=${cartID}`;
        const options = { 
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const deleteCart = await response.json();
            return deleteCart;
        } catch (error) {
            console.log("Server Service :: DELETE Cart", error);
        }
    }
}

const cartService = new CartService();

export default cartService;