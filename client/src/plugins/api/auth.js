import axios from 'axios';
import store from '../../store';
export default {
    async signIn(loginData) {
        const response = await axios.post(`${this.BASE_URL}/api/auth/login`, loginData);
        this.setTokens(response.data);
        return response;
    },

    async signUp(registerData) {
        return await axios.post(`${this.BASE_URL}/api/auth/register`, registerData);
    },

    async checkAuth() {
        try {
            await axios.get(`${this.BASE_URL}/api/auth/check-auth`,
                { headers: { 'Authorization': this.getAuthToken() } }
            );
            store.dispatch('setIsAuth', true);
        } catch (err) {
            await this.refreshToken();
            await axios.get(`${this.BASE_URL}/api/auth/check-auth`,
                { headers: { 'Authorization': this.getAuthToken() } }
            );
            store.dispatch('setIsAuth', true);
        }
    },

    async refreshToken() {
        const response = await axios.post(`${this.BASE_URL}/api/auth/refresh-token`,
            {}, { headers: { 'Authorization': this.getRefreshToken() } }
        );
        this.setTokens(response.data);
        return response;
    }
}