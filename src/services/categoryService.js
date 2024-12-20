export class CategoryService {
    constructor() { }

    // Get All Categories
    async getCategories() {

        const url = "https://api.almehdisolutions.com/api/Menu/GetMenu";
        const options = { method: "GET", headers: { accept: 'application/json' } }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.log("Server Service :: Categories", error);
        }
    }

    // Get Category By Id
    async getCategoryByID(id) {

        const url = "https://api.almehdisolutions.com/api/Menu/GetMenuById";
        const options = { method: "GET", headers: { accept: 'application/json' } }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const category = await response.json();
            return category;
        } catch (error) {
            console.log("Server Service :: Category", error);
        }
    }
}

const categoryService = new CategoryService();

export default categoryService;