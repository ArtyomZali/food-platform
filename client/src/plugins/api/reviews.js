import axios from 'axios';
export default {
    async getReviewsByShopItemId(id) {
        return await axios.get(`${this.BASE_URL}/api/reviews/get-by-shop-item/${id}`);
    },
    async deleteReview(id) {
        return await axios.delete(`${this.BASE_URL}/api/reviews/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async createReview(reviewData) {
        return await axios.post(`${this.BASE_URL}/api/reviews`,
            reviewData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
}