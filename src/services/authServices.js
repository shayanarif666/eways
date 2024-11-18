export class AuthService {
    constructor() { }

    // Registration Service -- TODO : Complete After Backend Completion
    async registerUser({ fullName, username, email, password, role, gender }) {
        try {
            const response = await fetch("", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Something went wrong !");
            return "Successfully Registered";
        } catch (error) {
            console.log("Server Service :: Register", error);
        }
    }

    // Login Service
    async loginUser({ username, password }) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'emilys',
                    password: 'emilyspass',
                    expiresInMins: 30,
                }),
                credentials: 'include'
            })
            if (!res.ok) throw new Error("Something went wrong !");
            return await res.json();
        } catch (error) {
            console.log("Server Service :: Login", error);
        }
    }

    // Get Current User
    async getCurrentUser(token) {
        try {
            const res = await fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            return await res.json();
        } catch (error) {
            console.error("Server Service :: Active User", error);
        }
    }
}

const authService = new AuthService();

export default authService;