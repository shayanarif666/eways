export class CategoryService {
    constructor() { }

    // Get All Categories -- TODO : Research About API METHODS -- Object
    async getCategories() {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            if (!response.ok) throw new Error("Something went wrong !");
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.log("Server Service :: Categories", error);
        }
    }
}

const categoryService = new CategoryService();

export default categoryService;