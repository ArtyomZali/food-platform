<template>
  <v-container>
    <v-card v-if="sellerProfile">
      <h1>Данные продавца</h1>
      <v-img :src="sellerProfileAvatar" alt="Аватар аккаунта продавца"></v-img>
    </v-card>
    <v-sheet v-else>
      <h1>У вас еще нет аккаунта продавца</h1>
      <v-btn color="primary" @click="openCreateSellerProfileModal"
        >Создать</v-btn
      >
    </v-sheet>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sellerProfile: null,
      isCreateSellerProfileModalOpened: false,
    };
  },

  methods: {
    async getSellerProfileData() {
      await this.$callWithErrorHandler(async () => {
        this.sellerProfile = (await this.$api.getUserSellerProfile()).data;
      });
    },

    openCreateSellerProfileModal() {
      this.isCreateSellerProfileModalOpened = true;
    },
  },

  async beforeMount() {
    await this.getSellerProfileData();
    if (this.sellerProfile) {
    }
  },
};
</script>

<style>
</style>