import axios from 'axios';
export default {
    async getShopItems(query) {
        return await axios.get(`${this.BASE_URL}/api/shop-items${query ? query : ''}`);
    },

    async getUserShopItems() {
        return await axios.get(`${this.BASE_URL}/api/shop-items/my`, {
            headers: {
                'Authorization': this.getAuthToken()
            }
        })
    },

    async getShopItemsByOwnerId(id) {
        return await axios.get(`${this.BASE_URL}/api/shop-items/by-owner-id/${id}`);
    },

    async getShopItemCategories() {
        return await axios.get(`${this.BASE_URL}/api/shop-items/categories`);
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