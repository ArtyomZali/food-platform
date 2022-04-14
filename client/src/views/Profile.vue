<template>
  <v-container v-if="user">
    <v-card>
      <h1>Данные пользователя</h1>
      <v-img :src="userAvatar" alt="Аватар пользователя"></v-img>
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        Заменить фото
      </v-btn>
      <label for="name-field">Имя</label>
      <p name="name-field">{{ user.name }}</p>
      <label for="email-field">Почта</label>
      <p name="email-field">{{ user.email }}</p>
      <label for="name-field">Адрес</label>
      <p name="name-field">{{ user.address }}</p>
      <v-btn @click="openChangeUserDataModal">Изменить данные</v-btn>
    </v-card>
    <v-divider></v-divider>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      sellerProfile: null,

      isChangeUserDataModalOpened: false,
      isChangeUserAvatarModalOpened: false,
      isCreateSellerProfileModalOpened: false,
      
    };
  },

  computed: {
    userAvatar() {
      return this.user?.avatar ? this.user.avatar : "@/assets/avatar.png";
    },
  },

  methods: {
    async getUserData() {
      await this.$callWithErrorHandler(async () => {
        this.user = await this.$api.getUserData();
      });
    },

    async getSellerProfileData() {
      await this.$callWithErrorHandler(async () => {
        this.sellerProfile = await this.$api.getUserSellerProfile();
      });
    },

    openChangeUserDataModal() {
      this.isChangeUserDataModalOpened = true;
    },

    openChangeUserAvatarModal() {
      this.isChangeUserAvatarModalOpened = true;
    },
  },

  async beforeMount() {
    this.getUserData();
    await this.getSellerProfileData();
    if (this.sellerProfile) {
    }
  },
};
</script>

<style>
</style>