<template>
  <v-card class="review-card">
    <v-img class="user-avatar" max-width="64" :src="userAvatar"></v-img>
    <div>
      <h4>{{ review.User.name }}</h4>
      <p>{{ review.text }}</p>
      <v-rating
        half-increments
        readonly
        length="5"
        size="16"
        :value="review.grade"
      ></v-rating>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userAvatar() {
      return this.review.User?.avatar
        ? `${this.$api.BASE_URL}${this.review.User.avatar}`
        : require("@/assets/default.png");
    },
  },
};
</script>

<style scoped lang="scss">
.review-card {
  max-width: 600px;
  display: flex;
  padding: 16px;
  align-items: center;
  margin-top: 32px;

  .user-avatar {
    height: 64px;
    width: 64px;
    margin-right: 12px;
  }

  p {
      margin: unset;
  }
}
</style>