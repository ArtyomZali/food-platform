import axios from 'axios';
export default {
    async getUserPurchases() {
        return await axios.get(`${this.BASE_URL}/purchases/my`);
    },
    async getUserOrders() {
        return await axios.get(`${this.BASE_URL}/purchases/orders`);
    },
    async createPurchase(purchaseData) {
        return await axios.post(`${this.BASE_URL}/purchases`,
            purchaseData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async updatePurchaseStatus(purchaseData) {
        return await axios.put(`${this.BASE_URL}/purchases/update-status/${purchaseData.id}`,
            purchaseData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async getPurchase(id) {
        return await axios.get(`${this.BASE_URL}/purchases/${id}`);
    },
}