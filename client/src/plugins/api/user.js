import axios from 'axios';
export default {
    async getUserData() {
        return await axios.get(`${this.BASE_URL}/users/user-data`,
            { headers: { 'Authorization': this.getAuthToken() } });
    },

    async updateUserData(userData) {
        return await axios.put(`${this.BASE_URL}/users/user-data`, userData);
    },

    async getOtherUserData(id) {
        await axios.get(`${this.BASE_URL}/users/${id}`);
    },
}