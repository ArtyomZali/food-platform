<template>
  <v-container class="seller-profile-page">
    <div v-if="sellerProfile" class="seller-profile-page__seller-profile">
      <v-col>
        <div>
          <h2 class="seller-profile-page__header">Данные продавца</h2>
          <div class="seller-profile-page__seller-profile-info-container">
            <div class="mr-2 mb-2">
              <v-img
                :src="sellerProfileAvatar"
                alt="Аватар пользователя"
                class="seller-profile-page__sellerProfile-avatar"
              ></v-img>
              <v-btn
                color="primary"
                class="seller-profile-page__change-avatar-btn"
                dark
                @click="openChangeSellerProfileAvatarModal"
              >
                Заменить фото
              </v-btn>
            </div>
            <v-col>
              <label class="text-caption" for="name-field">Название</label>
              <p name="name-field">{{ sellerProfile.name }}</p>
              <label class="text-caption" for="description-field"
                >Описание</label
              >
              <p name="description-field">{{ sellerProfile.description }}</p>
              <div v-if="sellerProfile.phone">
                <label class="text-caption" for="phone-field">Телефон</label>
                <p name="phone-field">+7{{ sellerProfile.phone }}</p>
              </div>
              <p v-else>Телефон не указан</p>
              <div v-if="!sellerProfile.isPublished">
                <p>Аккаунт не опубликован</p>
                <v-btn
                  color="primary"
                  class="seller-profile-page__change-avatar-btn"
                  dark
                  @click="openPublishSellerProfileModal"
                >
                  Опубликовать
                </v-btn>
              </div>
            </v-col>
          </div>
        </div>
        <div class="map-container">
          <label
            v-if="sellerProfile.SellerProfileCategories.length"
            class="text-caption d-block"
            >Категории</label
          >
          <v-chip
            v-for="category in sellerProfile.SellerProfileCategories"
            :key="`seller-profile-category-chip-${category.id}`"
            color="primary"
            class="category-chip"
            label
            outlined
            >{{ category.name }}
          </v-chip>
          <label v-if="sellerProfile.Address" class="text-caption d-block"
            >Адрес</label
          >
          <yandex-map
            v-if="sellerProfile.Address"
            :coords="sellerProfileAddress"
            :zoom="10"
          >
            <ymap-marker :coords="sellerProfileAddress" marker-id="123" />
          </yandex-map>
          <h3 v-else>Адрес не указан</h3>
          <v-btn color="primary" @click="openChangeSellerProfileDataModal"
            >Изменить данные</v-btn
          >
        </div>
        <label class="text-caption d-block mt-3">Материалы</label>
        <assets-slider
          :mutable="true"
          type="sellerProfile"
          :sellerProfile="sellerProfile"
          @update="getSellerProfileData"
        />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <v-tabs v-model="currentTab" centered>
          <v-tab v-for="tab in tabs" :key="`profile-page-tab-${tab.id}`">{{
            tab.title
          }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
          <v-tab-item
            v-for="tab in tabs"
            :key="`profile-page-tabbed-${tab.id}`"
          >
            <component :is="tab.component" />
          </v-tab-item> </v-tabs-items
      ></v-col>
    </div>
    <v-sheet v-else class="seller-profile-page__no-seller-profile-block">
      <h1>У вас еще нет аккаунта продавца</h1>
      <v-btn color="primary" @click="openCreateSellerProfileModal"
        >Создать</v-btn
      >
    </v-sheet>
    <create-seller-profile-modal
      v-if="!sellerProfile"
      :isOpened="isCreateSellerProfileModalOpened"
      @close="closeCreateSellerProfileModal"
    />
    <div v-else>
      <upload-asset-modal
        @close="closeChangeSellerProfileAvatarModal"
        :isOpened="isChangeSellerProfileAvatarModalOpened"
        :previousImageUrl="sellerProfile.avatar"
        title="Изменение аватара продавца"
        buttonLabel="Заменить"
      />
      <change-seller-profile-data-modal
        v-if="sellerProfile"
        :sellerProfile="sellerProfile"
        :isOpened="isChangeSellerProfileDataModalOpened"
        @close="closeChangeSellerProfileDataModal"
      />
      <confirmation-modal
        v-if="sellerProfile && !sellerProfile.isPublished"
        :isOpened="isPublishSellerProfileModalOpened"
        @confirm="publishSellerProfile"
        @close="closePublishSellerProfileModal"
        title="Публикация аккаунта продавца"
        text="Вы уверены, что хотите опубликовать аккаунт продавца? Это действие
        нельзя будет отменить"
        buttonLabel="Опубликовать"
      />
    </div>
  </v-container>
</template>

<script>
import CreateSellerProfileModal from "../components/CreateSellerProfileModal.vue";
import ChangeSellerProfileDataModal from "../components/ChangeSellerProfileDataModal.vue";
import SellerShopItems from "../components/SellerShopItems.vue";
import Orders from "../components/Orders.vue";
import AssetsSlider from "../components/AssetSlider.vue";
import UploadAssetModal from "../components/UploadAssetModal.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";

export default {
  components: {
    CreateSellerProfileModal,
    ChangeSellerProfileDataModal,
    Orders,
    SellerShopItems,
    AssetsSlider,
    UploadAssetModal,
    ConfirmationModal,
  },

  data() {
    return {
      sellerProfile: null,
      isCreateSellerProfileModalOpened: false,
      isChangeSellerProfileAvatarModalOpened: false,
      isChangeSellerProfileDataModalOpened: false,
      isPublishSellerProfileModalOpened: false,
      currentTab: null,
      tabs: [
        {
          id: 1,
          title: "Мои товары",
          component: "SellerShopItems",
        },
        {
          id: 2,
          title: "Заказы",
          component: "Orders",
        },
      ],
    };
  },

  methods: {
    async getSellerProfileData() {
      await this.$callWithErrorHandler(async () => {
        this.sellerProfile = (await this.$api.getUserSellerProfile()).data;
      });
    },

    openPublishSellerProfileModal() {
      this.isPublishSellerProfileModalOpened = true;
    },

    openCreateSellerProfileModal() {
      this.isCreateSellerProfileModalOpened = true;
    },

    openChangeSellerProfileAvatarModal() {
      this.isChangeSellerProfileAvatarModalOpened = true;
    },

    openChangeSellerProfileDataModal() {
      this.isChangeSellerProfileDataModalOpened = true;
    },

    closePublishSellerProfileModal() {
      this.isPublishSellerProfileModalOpened = false;
    },

    closeCreateSellerProfileModal() {
      this.isCreateSellerProfileModalOpened = false;
      this.getSellerProfileData();
    },

    async closeChangeSellerProfileAvatarModal(value) {
      if (value) {
        await this.$callWithErrorHandler(async () => {
          await this.$api.updateSellerProfileAvatar({ avatar: value });
        });
        this.getSellerProfileData();
      }
      this.isChangeSellerProfileAvatarModalOpened = false;
    },

    closeChangeSellerProfileDataModal() {
      this.isChangeSellerProfileDataModalOpened = false;
      this.getSellerProfileData();
    },

    async publishSellerProfile() {
      await this.$callWithErrorHandler(async () => {
        await this.$api.updateSellerProfile({
          ...this.sellerProfile,
          categories: this.sellerProfile.SellerProfileCategories,
          isPublished: true,
        });
        this.isOpened = false;
        this.isPublishSellerProfileModalOpened = false;
        this.getSellerProfileData();
      });
    },
  },

  computed: {
    sellerProfileAvatar() {
      return this.sellerProfile?.avatar
        ? `${this.$api.BASE_URL}${this.sellerProfile.avatar}`
        : require("@/assets/default.png");
    },

    sellerProfileAddress() {
      return this.sellerProfile.Address
        ? [this.sellerProfile.Address.x, this.sellerProfile.Address.y]
        : [];
    },
  },

  async beforeMount() {
    this.$store.dispatch("setIsLoading", true);
    await this.getSellerProfileData();
    if (this.sellerProfile) {
    }
    this.$store.dispatch("setIsLoading", false);
  },
};
</script>

<style scoped lang="scss">
.seller-profile-page {
  height: 100%;
  &__seller-profile {
    display: flex;
  }
  &__no-seller-profile-block {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__header {
    text-align: center;
    margin-top: 12px;
  }

  &__seller-profile-info-container {
    display: flex;
  }

  &__sellerProfile-avatar {
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

.category-chip {
  margin: 0 12px 12px 0;
}
</style>