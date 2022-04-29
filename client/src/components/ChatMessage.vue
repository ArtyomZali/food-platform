<template>
  <v-card :class="`chat-message chat-message-${userType === message.author ? 'my' : 'not-my'}`">
    <h4 v-if="message.author !== userType">{{ otherPersonName }}</h4>
    <p>{{ message.text }}</p>
    <div
      v-if="message.author === userType"
      class="read-mark"
    >
      <v-icon color="primary">{{
        message.isSeen ? "mdi-check-all" : "mdi-check"
      }}</v-icon>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    otherPersonName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.chat-message {
    position: relative;
    padding: 20px 24px 20px 20px;
    margin-bottom: 16px;
}

.chat-message-my {
    margin-left: auto;
}

.chat-message-not-my {
    margin-right: auto;
}

p {
    margin: 0;
}
.read-mark {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 16px;
    right: 16px;
}
</style>