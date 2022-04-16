<template>
  <v-container class="profile-page" v-if="user">
    <v-col>
      <h2 class="profile-page__header">Данные пользователя</h2>
      <div class="profile-page__user-info-container">
        <v-col>
          <v-img
            :src="userAvatar"
            alt="Аватар пользователя"
            class="profile-page__user-avatar"
          ></v-img>
          <v-btn
            color="primary"
            class="profile-page__change-avatar-btn"
            dark
            @click="openChangeUserAvatarModal"
          >
            Заменить фото
          </v-btn>
        </v-col>
        <v-col>
          <label class="text-caption" for="name-field">Имя</label>
          <p name="name-field">{{ user.name }}</p>
          <label class="text-caption" for="email-field">Почта</label>
          <p name="email-field">{{ user.email }}</p>
        </v-col>
      </div>
      <v-col class="map-container">
        <label v-if="user.Address" class="text-caption" for="name-field"
          >Адрес</label
        >
        <yandex-map v-if="user.Address" :coords="userAddress" :zoom="10">
          <ymap-marker :coords="userAddress" marker-id="123" />
        </yandex-map>
        <h3 v-else>Адрес не указан</h3>
        <v-btn color="primary" @click="openChangeUserDataModal"
          >Изменить данные</v-btn
        >
      </v-col>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col>
      <v-tabs v-model="currentTab" centered>
        <v-tab v-for="tab in tabs" :key="`profile-page-tab-${tab.id}`">{{
          tab.title
        }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item v-for="tab in tabs" :key="`profile-page-tabbed-${tab.id}`">
          <component :is="tab.component" />
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <upload-asset-modal
      @close="closeChangeUserAvatarModal"
      :isOpened="isChangeUserAvatarModalOpened"
      :previousImageUrl="user.avatar"
      title="Изменение аватара"
      buttonLabel="Заменить"
    />
    <change-user-data-modal
      @close="closeChangeUserDataModal"
      :user="user"
      :isOpened="isChangeUserDataModalOpened"
    />
  </v-container>
</template>

<script>
import Basket from "../components/Basket.vue";
import Purchases from "../components/Purchases.vue";
import ChangeUserDataModal from "../components/ChangeUserDataModal.vue";
import UploadAssetModal from "../components/UploadAssetModal.vue";
export default {
  components: {
    Basket,
    Purchases,
    ChangeUserDataModal,
    UploadAssetModal,
  },

  data() {
    return {
      user: null,
      isChangeUserDataModalOpened: false,
      isChangeUserAvatarModalOpened: false,
      currentTab: null,
      tabs: [
        {
          id: 1,
          title: "Корзина",
          component: "Basket",
        },
        {
          id: 2,
          title: "Мои заказы",
          component: "Purchases",
        },
      ],
    };
  },

  computed: {
    userAvatar() {
      return this.user?.avatar
        ? `${this.$api.BASE_URL}${this.user.avatar}`
        : require("@/assets/default.png");
    },
    userAddress() {
      return this.user.Address
        ? [this.user.Address.x, this.user.Address.y]
        : [];
    },
  },

  methods: {
    async getUserData() {
      await this.$callWithErrorHandler(async () => {
        this.user = (await this.$api.getUserData()).data;
      });
    },

    openChangeUserDataModal() {
      this.isChangeUserDataModalOpened = true;
    },

    openChangeUserAvatarModal() {
      this.isChangeUserAvatarModalOpened = true;
    },

    closeChangeUserDataModal() {
      this.isChangeUserDataModalOpened = false;
      this.getUserData();
    },

    async closeChangeUserAvatarModal(value) {
      if (value) {
        await this.$callWithErrorHandler(async () => {
          await this.$api.updateUserAvatar({ avatar: value });
        });
        this.getUserData();
      }
      this.isChangeUserAvatarModalOpened = false;
    },
  },

  async beforeMount() {
    this.$store.dispatch("setIsLoading", true);
    await this.getUserData();
    this.$store.dispatch("setIsLoading", false);
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;

  &__header {
    text-align: center;
    margin-top: 12px;
  }

  &__user-info-container {
    display: flex;
  }

  &__user-avatar {
    height: 160px;
    width: 160px;
    margin-bottom: 24px;
  }
}
.ymap-container {
  height: 200px;
  margin-bottom: 24px;
}

.map-container {
  display: block;
}
</style>