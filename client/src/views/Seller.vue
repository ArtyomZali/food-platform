<template>
  <v-container class="seller-profile-page">
    <div v-if="sellerProfile" class="seller-profile-page__seller-profile">
      <div>
        <h2 class="seller-profile-page__header">Данные продавца</h2>
        <div class="seller-profile-page__seller-profile-info-container">
          <div class="mr-2 mb-2">
            <v-img
              :src="sellerProfileAvatar"
              alt="Аватар пользователя"
              class="seller-profile-page__sellerProfile-avatar"
            ></v-img>
          </div>
          <v-col>
            <label class="text-caption" for="name-field">Название</label>
            <p name="name-field">{{ sellerProfile.name }}</p>
            <label class="text-caption" for="description-field">Описание</label>
            <p name="description-field">{{ sellerProfile.description }}</p>
            <div v-if="sellerProfile.phone">
              <label class="text-caption" for="phone-field">Телефон</label>
              <p name="phone-field">+7{{ sellerProfile.phone }}</p>
            </div>
            <p v-else>Телефон не указан</p>
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
      </div>
      <div v-if="sellerProfile.SellerProfileAssets.length">
        <label class="text-caption d-block mt-3">Материалы</label>
        <assets-slider
          :mutable="false"
          type="sellerProfile"
          :sellerProfile="sellerProfile"
          @update="getSellerProfileData"
          size="lg"
        />
        <h2>Товары</h2>
        <div class="grid">
          <shop-item-card
            v-for="shopItem in shopItems"
            :key="`shop-item-card-${shopItem.id}`"
            :shopItem="shopItem"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>


<script>
import ShopItemCard from "../components/ShopItemCard.vue";
import AssetsSlider from "../components/AssetsSlider.vue";
export default {
  components: {
    ShopItemCard,
    AssetsSlider,
  },
  data() {
    return {
      sellerProfile: null,
      shopItems: [],
    };
  },

  methods: {
    async getSellerProfileData() {
      await this.$callWithErrorHandler(async () => {
        this.sellerProfile = (
          await this.$api.getSellerProfile(this.$route.params.id)
        ).data;
      });
    },
    async getSellerShopItems() {
      await this.$callWithErrorHandler(async () => {
        this.shopItems = (
          await this.$api.getShopItemsByOwnerId(this.$route.params.id)
        ).data;
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
      await this.getSellerShopItems();
    }
    this.$store.dispatch("setIsLoading", false);
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 16px;
  width: 100%;
}
.seller-profile-page {
  height: 100%;
  &__seller-profile {
    display: flex;
    flex-direction: column;
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