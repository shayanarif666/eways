export class InvoiceService {
    constructor() { }

    // Get Invoice By User 
    async getInvoiceByUser(userID) {
        try {

        } catch (error) {

        }
    }

    // Add Invoice
    async addInvoice(token, sessionId) {
        console.log("token", token, sessionId)
        try {
            const res = await fetch(`https://api.almehdisolutions.com/api/Order/save-invoice?session_id=${sessionId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return res.json();
        } catch (error) {
            console.log("Invoice Service :: Add Invoice", error)
        }
    }
}

const invoiceService = new InvoiceService();

export default invoiceService;