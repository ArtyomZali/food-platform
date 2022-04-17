import axios from 'axios';
export default {
    async getAssetsBySellerProfileId(id) {
        return await axios.get(`${this.BASE_URL}/api/assets/by-seller-profile/${id}`);
    },
    async createSellerProfileAsset(assetData) {
        return await axios.post(`${this.BASE_URL}/api/assets/seller-profile-asset`,
            this.getFormDataFromObject(assetData),
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async deleteSellerProfileAsset(id) {
        return await axios.delete(`${this.BASE_URL}/api/assets/seller-profile-asset/${id}`, {
            headers: {
                'Authorization': this.getAuthToken()
            }
        });
    },

    async getAssetsByShopItemId(id) {
        return await axios.get(`${this.BASE_URL}/api/assets/by-shop-item/${id}`);
    },
    async createShopItemAsset(assetData, shopItemId) {
        return await axios.post(`${this.BASE_URL}/api/assets/shop-item-asset/${shopItemId}`,
            this.getFormDataFromObject(assetData),
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async deleteShopItemAsset(id) {
        return await axios.delete(`${this.BASE_URL}/api/assets/shop-item-asset/${id}`, {
            headers: {
                'Authorization': this.getAuthToken()
            }
        });
    },

    async updateUserAvatar(assetData) {
        return await axios.post(`${this.BASE_URL}/api/assets/user-avatar`,
            this.getFormDataFromObject(assetData), {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': this.getAuthToken()
            }
        }
        );
    },

    async updateSellerProfileAvatar(assetData) {
        return await axios.post(`${this.BASE_URL}/api/assets/seller-profile-avatar`,
            this.getFormDataFromObject(assetData), {
            headers: {
                'Authorization': this.getAuthToken()
            }
        }
        );
    },

    async updateShopItemAvatar(assetData, shopItemId) {
        return await axios.post(`${this.BASE_URL}/api/assets/shop-item-avatar/${shopItemId}`,
            this.getFormDataFromObject(assetData), {
            headers: {
                'Authorization': this.getAuthToken()
            }
        }
        );
    }
}