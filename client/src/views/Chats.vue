<template>
  <v-container>
    <h2>Чаты</h2>
    <chat-card
      v-for="chat in chats"
      :key="`chat-card-${chat.id}`"
      :chat="chat"
    />
  </v-container>
</template>

<script>
import ChatCard from "../components/ChatCard.vue";
export default {
  components: {
    ChatCard,
  },
  data() {
    return {
      chats: [],
    };
  },
  methods: {
    async getUserChats() {
      this.$callWithErrorHandler(async () => {
        this.chats = (await this.$api.getUserChats()).data;
      });
    },
  },
  beforeMount() {
    this.getUserChats();
  },
};
</script>

<style>
</style>