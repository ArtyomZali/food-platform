import axios from 'axios';
import store from '../../store';
export default {
    async getUserData() {
        const userData = await axios.get(`${this.BASE_URL}/api/users/user-data`,
            { headers: { 'Authorization': this.getAuthToken() } });
        store.dispatch('setUserData', userData.data);
        return userData;
    },

    async updateUserData(userData) {
        return await axios.put(`${this.BASE_URL}/api/users/user-data`,
            userData,
            { headers: { 'Authorization': this.getAuthToken() } }
        );
    },

    async updateUserAddress(data) {
        return await axios.put(`${this.BASE_URL}/api/users/address`,
            data,
            { headers: { 'Authorization': this.getAuthToken() } }
        );
    },

    async getOtherUserData(id) {
        await axios.get(`${this.BASE_URL}/api/users/${id}`);
    },
}