import axios from 'axios';
export default {
    async getUserChats() {
        return await axios.get(`${this.BASE_URL}/api/chats`, {
            headers: {
                'Authorization': this.getAuthToken()
            }
        });
    },
    async createChat(chatData) {
        return await axios.post(`${this.BASE_URL}/api/chats`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async sendMessage(chatData) {
        return await axios.post(`${this.BASE_URL}/api/chats/send-message/${chatData.id}`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async readMessages(chatData) {
        return await axios.put(`${this.BASE_URL}/api/chats/read-messages/${chatData.id}`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async deleteChat(id) {
        return await axios.delete(`${this.BASE_URL}/api/chats/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async getChat(id) {
        return await axios.get(`${this.BASE_URL}/api/chats/${id}`);
    },
}