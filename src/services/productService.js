export class ProductService {
    constructor() { }

    // Get All Products
    async getProducts() {
        const url = "https://api.almehdisolutions.com/api/Product/GetSku";
        const options = { method: "GET", headers: { accept: 'application/json' } }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: GET Products", error);
        }
    }

    // Get Single Products
    async getProduct(id) {
        const url = `https://api.almehdisolutions.com/api/Product/GetSkuById?skuid=${id}`;
        const options = { method: "GET", headers: { accept: 'application/json' } }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: GET Products", error);
        }
    }

    // Get Search Products
    async getSearchProducts(searchHeadline) {
        const url = `https://api.almehdisolutions.com/api/Product/SearchProduct?query=${searchHeadline}`;
        const options = { method: "GET", headers: { 'Content-Type': 'application/json' } }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: SEARCH Products", error);
        }
    }

    // Get Product By Categories :: TODO 
    async getProductsByCategories(categoryId, page = 1) {
        const pagePerProducts = 8;
        const startIndex = (page - 1) * pagePerProducts;
        const endIndex = startIndex + pagePerProducts;

        let filteredData = [];
        let lengthOfProducts;

        const url = `https://api.almehdisolutions.com/api/Menu/GetMenuById?id=${categoryId}`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong !");
            const { products } = await response.json();
            filteredData = products.slice(startIndex, endIndex);
            lengthOfProducts = products.length;

            return {
                filteredData,
                total: pagePerProducts,
                length: lengthOfProducts
            };
        } catch (error) {
            console.error("Server Service :: Categories Product", error);
        }
    }
}

const productService = new ProductService();

export default productService;