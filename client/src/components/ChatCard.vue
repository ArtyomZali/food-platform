<template>
  <v-card class="chat-card" @click="openChatPage" v-if="chat">
    <div class="d-flex">
      <v-img
        class="avatar"
        max-width="64"
        max-height="64"
        :src="otherPersonAvatar"
      ></v-img>
      <div>
        <h4 class="mb-2">{{ otherPersonName }}</h4>
        <div class="d-flex">
          <p class="chat-message">{{ lastMessage }}</p>
          <v-icon v-if="userType !== chat.ChatMessages[0].author && !chat.ChatMessages[0].isSeen" class="read-mark" color="primary">mdi-circle-medium</v-icon>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
  methods: {
    avatar(avatar) {
      return avatar
        ? `${this.$api.BASE_URL}${avatar}`
        : require("@/assets/default.png");
    },
    openChatPage() {
      this.$router.push(`/chat/${this.chat.id}`);
    },
  },
  computed: {
    otherPersonName() {
      return this.$store.getters.userData.id === this.chat.User.id
        ? this.chat.SellerProfile.name
        : this.chat.User.name;
    },
    otherPersonAvatar() {
      return this.$store.getters.userData.id === this.chat.User.id
        ? this.avatar(this.chat.SellerProfile.avatar)
        : this.avatar(this.chat.User.avatar);
    },
    lastMessage() {
      if (this.chat.ChatMessages.length) {
        if (this.userType === this.chat.ChatMessages[0].author) {
          return `Вы: ${this.chat.ChatMessages[0].text}`;
        } else {
          return `${this.otherPersonName}: ${this.chat.ChatMessages[0].text}`;
        }
      } else {
        return "В этом чате ещё нет сообщений";
      }
    },
    userType() {
      return this.$store.getters.userData.id === this.chat.User.id
        ? "customer"
        : "seller";
    },
  },
};
</script>

<style scoped>
.chat-card {
  padding: 16px;
  cursor: pointer;
  margin-bottom: 32px;
}

.avatar {
  margin-right: 16px;
}

.chat-message {
  margin-bottom: 0;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
}

.read-mark {
  width: 24px;
  height: 24px;
}
</style>