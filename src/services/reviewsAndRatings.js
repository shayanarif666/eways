export class ReviewsService {
    constructor() { }

    // Add Rating
    async addRating(token, userRating) {
        console.log(token, userRating)
        const url = 'https://api.almehdisolutions.com/api/Cart/AddRating';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(userRating)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: Add Rating", error);
        }
    }

    // Add Review
    async addReview(token, userRating) {
        console.log(token, userRating)
        const url = 'https://api.almehdisolutions.com/api/Cart/AddComment';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(userRating)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Server Service :: Add Rating", error);
        }
    }

}

const reviewService = new ReviewsService();

export default reviewService;