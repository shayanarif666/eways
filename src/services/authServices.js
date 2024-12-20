export class AuthService {
    constructor() { }

    // Registration Service -- TODO : Complete After Backend Completion
    async registerUser({ first_name, last_name, email, password }) {
        const url = 'https://api.almehdisolutions.com/api/User/Register';
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ first_name, last_name, user_name: email, password }) };

        try {
            const res = await fetch(url, options)
            if (!res.ok) throw new Error("Something went wrong !");
            return await res.json();
        } catch (error) {
            console.log("Server Service :: REGISTER", error);
        }
    }

    // Login Service
    async loginUser({ email, password }) {
        const url = 'https://api.almehdisolutions.com/api/User/Login';
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_name: email, password }) };

        try {
            const res = await fetch(url, options)
            if (!res.ok) throw new Error("Something went wrong !");
            return await res.json();
        } catch (error) {
            console.log("Server Service :: LOGIN", error);
        }
    }

    // Get Current User
    async updateProfile(data, token) {

        console.log("token", token, data)

        const url = "https://api.almehdisolutions.com/api/User/UpdateProfile";
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            console.log(response)
            const data = await response.json();
            console.log(data);
            // Stored in Local Storage
            localStorage.setItem("updatedUser", JSON.stringify(data.res));
        } catch (error) {
            console.log("Server Service :: USER Cart", error);
        }
    }

    // Logout Service
    async logout() {

        const url = 'https://api.almehdisolutions.com/api/User/SignOut';
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        try {
            const res = await fetch(url, options)
            if (!res.ok) throw new Error("Something went wrong !");
            return await res.json();
        } catch (error) {
            console.log("Server Service :: LOGOUT", error);
        }
    }
}

const authService = new AuthService();

export default authService;