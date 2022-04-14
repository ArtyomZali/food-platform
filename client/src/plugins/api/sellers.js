import axios from 'axios';
export default {
    async getSellerProfiles() {
        return await axios.get(`${this.BASE_URL}/seller-profiles`);
    },
    async getSellerProfile(id) {
        return await axios.get(`${this.BASE_URL}/seller-profiles/${id}`);
    },
    async getUserSellerProfile() {
        return axios.post(`${this.BASE_URL}/seller-profiles/my`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async createSellerProfile(sellerProfileData) {
        return axios.post(`${this.BASE_URL}/seller-profiles/`,
            sellerProfileData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async updateSellerProfile(sellerProfileData) {
        return axios.put(`${this.BASE_URL}/seller-profiles/${sellerProfileData.id}`,
            sellerProfileData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
    async deleteSellerProfile(id) {
        return axios.delete(`${this.BASE_URL}/seller-profiles/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            })
    },
}