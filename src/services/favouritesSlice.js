export class FavouritesService {
    constructor() { }

    // Get Favourites
    async getFavourites(token) {
        const url = "https://api.almehdisolutions.com/api/Widget/GetWidgetById";
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const favourites = await response.json();
            return favourites;
        } catch (error) {
            console.log("Server Service :: USER Cart", error);
        }
    }

    // Add Cart
    async addFavourite(sku_id, token) {

        console.log(sku_id, token)

        const url = `https://api.almehdisolutions.com/api/Widget/AddWidget?sku_id=${sku_id}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({})
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const addFavourite = await response.json();
            return addFavourite;
        } catch (error) {
            console.log("Server Service :: ADD Cart", error);
        }
    }

    // Delete Cart
    async deleteFavourite(sku_id, token) {
        const url = `https://api.almehdisolutions.com/api/Widget/DeleteWidget?sku_id=${sku_id}`;
        const options = { 
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const deleteFavourite = await response.json();
            return deleteFavourite;
        } catch (error) {
            console.log("Server Service :: DELETE Cart", error);
        }
    }
}

const favouritesService = new FavouritesService();

export default favouritesService;