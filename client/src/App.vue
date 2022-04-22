<template>
  <v-app>
    <v-fade-transition mode="out-in">
    <div class="loader-container" v-if="isLoading">
      <v-progress-circular
        indeterminate
        :size="70"
        color="primary"
      ></v-progress-circular>
    </div>
    </v-fade-transition>
    <navbar></navbar>
    <v-main>
      <router-view></router-view>
      <v-alert
        v-if="isError"
        type="error"
        class="auth-card__alert"
        transition="scale-transition"
        >{{ errorMessage }}</v-alert
      >
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    navbar: Navbar,
  },

  computed: {
    isError() {
      return this.$store.getters.isError;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },

  async beforeMount() {
    await this.$api.checkAuth();
    if(this.$store.getters.isAuth) {
      this.$api.getUserData();
    }
  },
};
</script>

<style scoped lang="scss">
.v-alert.auth-card__alert {
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  right: 32px;
}
.loader-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: #fff;
}
</style>
