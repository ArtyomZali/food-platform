<template>
  <v-app>
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
  },

  beforeMount() {
    this.$api.checkAuth();
  },
};
</script>

<style scoped lang="scss">
</style>
