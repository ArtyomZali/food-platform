import axios from 'axios';
export default {
    async getShopItems() {
        return await axios.get(`${this.BASE_URL}/api/shop-items`);
    },
    async getShopItem(id) {
        return await axios.get(`${this.BASE_URL}/api/shop-items/${id}`);
    },
    async createShopItem(shopItemData) {
        return axios.post(`${this.BASE_URL}/api/shop-items/`,
            shopItemData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async updateShopItem(shopItemData) {
        return axios.put(`${this.BASE_URL}/api/shop-items/${shopItemData.id}`,
            shopItemData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async deleteShopItem(id) {
        return axios.delete(`${this.BASE_URL}/api/shop-items/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
}