<template>
  <v-container class="auth-page">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.auth-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>