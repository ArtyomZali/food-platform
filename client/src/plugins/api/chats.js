import axios from 'axios';
export default {
    async getUserChats() {
        return await axios.get(`${this.BASE_URL}/chats`, {
            headers: {
                'Authorization': this.getAuthToken()
            }
        });
    },
    async createChat(chatData) {
        return await axios.post(`${this.BASE_URL}/chats`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async sendMessage(chatData) {
        return await axios.post(`${this.BASE_URL}/chats/send-message/${chatData.id}`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async readMessages(chatData) {
        return await axios.put(`${this.BASE_URL}/chats/read-messages/${chatData.id}`,
            chatData,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async deleteChat(id) {
        return await axios.delete(`${this.BASE_URL}/chats/${id}`,
            {
                headers: {
                    'Authorization': this.getAuthToken()
                }
            }
        );
    },
    async getChat(id) {
        return await axios.get(`${this.BASE_URL}/chats/${id}`);
    },
}