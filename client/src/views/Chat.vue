<template>
  <v-container>
    <v-card class="chat">
      <div class="chat-header">
        <v-img
          class="avatar"
          max-width="128"
          max-height="128"
          :src="otherPersonAvatar"
        ></v-img>
        <h2 class="mb-2">{{ otherPersonName }}</h2>
      </div>
      <div class="chat-body">
        <h1 v-if="chat && !chat.ChatMessages.length">
          В этом чате еще нет сообщений
        </h1>
        <div
          class="chat-messages-container"
          v-else-if="chat && chat.ChatMessages.length"
        >
          <chat-message
            v-for="message in chat.ChatMessages"
            :key="`chat-message-${message.id}`"
            :message="message"
            :userType="userType"
            :otherPersonName="otherPersonName"
          />
        </div>
      </div>
      <div class="chat-footer">
        <v-text-field label="Введите сообщение" v-model="message" />
        <v-btn
          color="primary"
          :disabled="!message"
          :loading="isLoading"
          @click="sendMessage"
          >Отправить</v-btn
        >
      </div>
    </v-card>
  </v-container>
</template>

<script>
import ChatMessage from "../components/ChatMessage.vue";

export default {
  components: {
    ChatMessage,
  },
  data() {
    return {
      chat: null,
      message: "",
      isLoading: false,
    };
  },
  methods: {
    avatar(avatar) {
      return avatar
        ? `${this.$api.BASE_URL}${avatar}`
        : require("@/assets/default.png");
    },
    async getChat() {
      try {
        this.chat = (await this.$api.getChat(this.$route.params.id)).data;
      } catch {
        this.$router.push("/chats");
      }
    },

    async sendMessage() {
      if (this.message) this.isLoading = true;
      await this.$callWithErrorHandler(async () => {
        await this.$api.sendMessage({ id: this.chat.id, text: this.message });
        this.message = "";
        this.getChat();
      });
      this.isLoading = false;
    },

    readMessages() {
      this.$callWithErrorHandler(async () => {
        await this.$api.readMessages({ id: this.chat.id });
        this.getChat();
      });
    },
  },
  computed: {
    otherPersonName() {
      return this.$store.getters.userData?.id === this.chat?.User.id
        ? this.chat?.SellerProfile.name
        : this.chat?.User.name;
    },
    otherPersonAvatar() {
      return this.$store.getters.userData?.id === this.chat?.User.id
        ? this.avatar(this.chat?.SellerProfile.avatar)
        : this.avatar(this.chat?.User.avatar);
    },
    userType() {
      return this.$store.getters.userData?.id === this.chat?.User.id
        ? "customer"
        : "seller";
    },
  },
  async beforeMount() {
    await this.getChat();
    this.readMessages();
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  .avatar {
    margin-right: 24px;
  }
}

.chat-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;

  .chat-messages-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}

.chat-footer {
  display: flex;
  align-items: center;
  padding: 16px;

  .v-input {
    margin-right: 16px;
  }
}
</style>