<template>
  <v-container v-if="shopItem">
    <h2 class="seller-profile-page__header">{{ shopItem.name }}</h2>
    <div class="seller-profile-page__seller-profile-info-container">
      <div class="mr-2 mb-2">
        <v-img
          :src="shopItemAvatar"
          alt="Аватар пользователя"
          class="seller-profile-page__sellerProfile-avatar"
        ></v-img>
      </div>
      <v-col>
        <label class="text-caption" for="description-field">Описание</label>
        <p name="description-field">{{ shopItem.description }}</p>
        <label class="text-caption" for="phone-field">Цена</label>
        <p>
          {{ shopItem.price }}р за
          {{ shopItem.unitName }}
        </p>
        <v-chip
          v-if="shopItem.ShopItemCategory"
          color="primary"
          class="category-chip"
          label
          outlined
          >{{ shopItem.ShopItemCategory.name }}
        </v-chip>
        <v-btn
          v-if="isAuth && isNotOwnerOfShopItem"
          class="d-flex"
          color="primary"
          @click="addShopItemToBasket"
          >Добавить в корзину</v-btn
        >
      </v-col>
    </div>

    <h2>Продавец</h2>
    <div class="d-flex" v-if="sellerProfile">
      <div class="mr-4 mb-2">
        <v-img
          :src="sellerProfileAvatar"
          alt="Аватар пользователя"
          class="seller-profile-page__sellerProfile-avatar"
          max-width="160"
        ></v-img>
      </div>
      <div>
        <label class="text-caption" for="description-field">Название</label>
        <p name="description-field">{{ sellerProfile.name }}</p>
        <v-chip
          v-for="category in sellerProfile.SellerProfileCategories"
          :key="`seller-profile-category-chip-${category.id}`"
          color="primary"
          class="category-chip"
          label
          outlined
          >{{ category.name }}
        </v-chip>
        <v-btn
          class="d-flex"
          color="primary"
          :to="`/seller/${sellerProfile.id}`"
          >Перейти</v-btn
        >
      </div>
    </div>
    <label
      class="text-caption d-block mt-3"
      v-if="shopItem.ShopItemAssets.length"
      >Материалы</label
    >
    <assets-slider
      :mutable="false"
      size="lg"
      type="shopItem"
      :shopItem="shopItem"
      @update="getShopItem"
    />
    <h2>Отзывы</h2>
    <reviews :shopItem="shopItem" :mutable="isAuth && isNotOwnerOfShopItem" />
  </v-container>
</template>

<script>
import AssetsSlider from "../components/AssetsSlider.vue";
import Reviews from "../components/Reviews.vue";

export default {
  components: {
    AssetsSlider,
    Reviews,
  },
  data() {
    return {
      shopItem: null,
      sellerProfile: null,
    };
  },

  computed: {
    shopItemAvatar() {
      return this.shopItem?.avatar
        ? `${this.$api.BASE_URL}${this.shopItem.avatar}`
        : require("@/assets/default.png");
    },
    sellerProfileAvatar() {
      return this.sellerProfile?.avatar
        ? `${this.$api.BASE_URL}${this.sellerProfile.avatar}`
        : require("@/assets/default.png");
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
    isNotOwnerOfShopItem() {
      return this.$store.getters.userData?.id !== this.sellerProfile?.userId;
    },
  },

  methods: {
    async getShopItem() {
      await this.$callWithErrorHandler(async () => {
        this.shopItem = (
          await this.$api.getShopItem(this.$route.params.id)
        ).data;
      });
    },

    async getSellerProfile() {
      await this.$callWithErrorHandler(async () => {
        this.sellerProfile = (
          await this.$api.getSellerProfile(this.shopItem.ownerId)
        ).data;
      });
    },

    addShopItemToBasket() {
      this.$store.dispatch("addShopItemToBasket", {
        sellerProfile: this.sellerProfile,
        shopItem: this.shopItem,
      });
    },
  },

  async beforeMount() {
    await this.getShopItem();
    await this.getSellerProfile();
  },
};
</script>

<style scoped lang="scss">

@media (min-width: 1650px) {
  .container {
    max-width: 1185px;
  }
}
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

.update-btn {
  display: block;
  margin-top: 32px;
}

.publish-btn {
  display: block;
  margin-top: 20px;
}
.seller-profile-avatar {
  height: 160px;
  width: 160px;
  margin-bottom: 24px;
}
</style>