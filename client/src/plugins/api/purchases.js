import axios from 'axios';
export default {
    async getUserPurchases() {
        return await axios.get(`${this.BASE_URL}/api/purchases/my`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            });
    },
    async getUserOrders() {
        return await axios.get(`${this.BASE_URL}/api/purchases/orders`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            });
    },
    async createPurchase(purchaseData) {
        return await axios.post(`${this.BASE_URL}/api/purchases`,
            purchaseData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async updatePurchaseStatus(purchaseData) {
        return await axios.put(`${this.BASE_URL}/api/purchases/update-status/${purchaseData.id}`,
            purchaseData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async getPurchase(id) {
        return await axios.get(`${this.BASE_URL}/api/purchases/${id}`);
    },
}