<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/" class="logo">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Food Platform</h1>
      </router-link>
    </div>

    <v-spacer></v-spacer>
    <div v-if="isAuth">
      <v-btn
        elevation="0"
        color="primary"
        fab
        small
        link
        :to="'/seller-profile'"
      >
        <v-icon>mdi-barn</v-icon>
      </v-btn>
      <v-btn elevation="0" color="primary" fab small link :to="'/chats'">
        <v-icon>mdi-message-outline</v-icon>
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        fab
        small
        class="basket-button"
        link
        :to="'/profile'"
      >
        <span v-if="basketCount" class="basket-items-count">{{basketCount}}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn elevation="0" color="primary" fab small @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </div>
    <v-btn
      elevation="0"
      color="primary"
      fab
      small
      class="basket-button"
      link
      :to="'/auth/sign-in'"
      v-else
    >
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    basketCount() {
      const basket = this.$store.getters.basket;
      let shopItemsCount = 0;
      basket.forEach(seller => {
        shopItemsCount += seller.shopItems.length;
      });
      return shopItemsCount;
    }
  },

  methods: {
    logout() {
      this.$api.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  display: flex;

  h1 {
    color: #fff;
  }
}

.basket-button {
  position: relative;
}

.basket-items-count {
  position: absolute;
  top: 0;
  right: 0;
  background: orangered;
  color: #fff;
  border-radius: 50%;
  z-index: 100;
  height: 16px;
  width: 16px;
  text-align: center;
}

@media (max-width: 500px) {
  h1 {
    display: none;
  }
}
</style>