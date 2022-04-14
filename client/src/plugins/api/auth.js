import axios from 'axios';
import store from '../../store';
export default {
    async signIn(loginData) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
        this.setTokens(response.data);
        return response;
    },

    async signUp(registerData) {
        return await axios.post(`${this.BASE_URL}/auth/register`, registerData);
    },

    async checkAuth() {
        await axios.get(`${this.BASE_URL}/auth/check-auth`,
            { headers: { 'Authorization': this.getAuthToken() } }
        );
        store.dispatch('setIsAuth', true);
    },

    async refreshToken() {
        const response = await axios.get(`${this.BASE_URL}/auth/refresh-token`,
            { headers: { 'Authorization': this.getRefreshToken() } }
        );
        this.setTokens(response.data);
        return response;
    }
}