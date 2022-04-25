import axios from 'axios';
export default {
    async getSellerProfiles(query) {
        return await axios.get(`${this.BASE_URL}/api/seller-profiles${query ? query : ''}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            });
    },
    async getSellerProfile(id) {
        return axios.get(`${this.BASE_URL}/api/seller-profiles/${id}`);
    },
    async getUserSellerProfile() {
        return axios.get(`${this.BASE_URL}/api/seller-profiles/my`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async getSellerProfileCategories() {
        return await axios.get(`${this.BASE_URL}/api/seller-profiles/categories`);
    },
    async getExtendedSellerProfileCategories() {
        return await axios.get(`${this.BASE_URL}/api/seller-profiles/categories/extended`);
    },
    async createSellerProfile(sellerProfileData) {
        return axios.post(`${this.BASE_URL}/api/seller-profiles/`,
            sellerProfileData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async updateSellerProfile(sellerProfileData) {
        return axios.put(`${this.BASE_URL}/api/seller-profiles/${sellerProfileData.id}`,
            sellerProfileData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            });
    },
    async updateSellerProfileAddress(data) {
        return axios.put(`${this.BASE_URL}/api/seller-profiles/address`,
            data,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            });
    },
    async deleteSellerProfile(id) {
        return axios.delete(`${this.BASE_URL}/api/seller-profiles/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
}