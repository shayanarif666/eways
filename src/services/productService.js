export class ProductService {
    constructor() { }

    // Get All Products
    async getProducts(page = 1) {
        try {
            const response = await fetch("https://dummyjson.com/products?limit=194");
            if (!response.ok) throw new Error("Something went wrong !");
            const data = await response.json();

            return {
                products: data.products, // Complete product list
            };
        } catch (error) {
            console.log("Server Service :: Product", error);
        }
    }

    // Get Single Products
    async getProduct(id) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            if (!response.ok) throw new Error("Something went wrong !");
            const product = await response.json();
            return product;
        } catch (error) {
            console.log("Server Service :: Product", error);
        }
    }

    // Get Search Products
    async getSearchProducts(searchHeadline) {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchHeadline}`);
            if (!response.ok) throw new Error("Something went wrong !");
            const products = await response.json();
            return products;
        } catch (error) {
            console.error("Server Service :: Search Product", error);
        }
    }

    // Skip & Limit Products
    async getProductsByCategories(category, page = 1) {
        const pagePerProducts = 8;
        const startIndex = (page - 1) * pagePerProducts;
        const endIndex = startIndex + pagePerProducts;

        let filteredData = [];
        let lengthOfProducts;

        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
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

    // Add Product
    async addProduct(data) {
        try {
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const newProduct = await response.json();
            return newProduct;
        } catch (error) {
            console.error("Server Service :: Add Product", error);
        }
    }

    // Update Product
    async updateProduct(data, id) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const updateProduct = await response.json();
            return updateProduct;
        } catch (error) {
            console.error("Server Service :: Update Product", error);
        }
    }

    // Delete Product
    async deleteProduct(id) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Something went wrong !");
            const deleteProduct = await response.json();
            return deleteProduct;
        } catch (error) {
            console.error("Server Service :: Delete Product", error);
        }
    }

    // ------------------------- File Manageing ----------------------------

    // Upload File
    async uploadFile(filePath) {
        const formData = new FormData();
        formData.append('file', filePath);

        try {
            const response = await fetch('/api/files', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error("Image upload failed");
            const result = await response.json();
            return result.imageUrl; // Assuming the API returns a URL
        } catch (error) {
            console.error('Error Uploading File:', error);
        }
    }

    // Delete File
    async deleteFile(fileID) {
        try {
            const response = await fetch(`/api/files/${fileID}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error("Image upload failed");
            const result = await response.json();
            console.log('File successfully deleted:', result);
        } catch (error) {
            console.error('Error Deleting File:', error);
        }
    }
}

const productService = new ProductService();

export default productService;