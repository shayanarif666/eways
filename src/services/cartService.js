export class CartService {
    constructor() { }

    // Get Carts
    async getCarts() {
        try {
            const response = await fetch(`/api/carts`);
            if (!response.ok) throw new Error("Something went wrong !");
            const carts = await response.json();
            return carts;
        } catch (error) {
            console.log("Server Service :: Carts", error);
        }
    }

    // Get Single Cart
    async getCart(id) {
        try {
            const response = await fetch(`/api/carts/user/${id}`);
            if (!response.ok) throw new Error("Something went wrong !");
            const cart = await response.json();
            return cart;
        } catch (error) {
            console.log("Server Service :: Cart", error);
        }
    }

    // Add Cart
    async addCart(data, id) {
        try {
            const response = await fetch(`/api/carts/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: id,
                    products: [data]
                })
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const addCart = await response.json();
            return addCart;
        } catch (error) {
            console.log("Server Service :: Add Cart", error);
        }
    }

    // Update Cart
    async updateCart(data, id) {
        try {
            const response = await fetch(`/api/carts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: data
                })
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const updateCart = await response.json();
            return updateCart;
        } catch (error) {
            console.log("Server Service :: Update Cart", error);
        }
    }

    // Delete Cart
    async deleteCart(productID, userID) {
        try {
            const response = await fetch(`/api/carts/${userID}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const deleteCart = await response.json();
            return deleteCart;
        } catch (error) {
            console.log("Server Service :: Delete Cart", error);
        }
    }
}

const cartService = new CartService();

export default cartService;