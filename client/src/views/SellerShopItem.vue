<template>
  <v-container v-if="isAccessAllowed" class="d-flex">
    <v-col>
      <div>
        <h2 class="seller-profile-page__header">{{ shopItem.name }}</h2>
        <div class="seller-profile-page__seller-profile-info-container">
          <div class="mr-2 mb-2">
            <v-img
              :src="shopItemAvatar"
              alt="Аватар пользователя"
              class="seller-profile-page__sellerProfile-avatar"
            ></v-img>
            <v-btn
              color="primary"
              class="seller-profile-page__change-avatar-btn"
              dark
              @click="openChangeShopItemAvatarModal"
            >
              Заменить фото
            </v-btn>
          </div>
          <v-col>
            <label class="text-caption" for="description-field">Описание</label>
            <p name="description-field">{{ shopItem.description }}</p>
            <label class="text-caption" for="phone-field">Количество</label>
            <p name="phone-field">
              {{ shopItem.count }} ({{ shopItem.unitName }})
            </p>
            <v-chip
              v-if="shopItem.ShopItemCategory"
              color="primary"
              class="category-chip"
              label
              outlined
              >{{ shopItem.ShopItemCategory.name }}
            </v-chip>
            <div v-if="!shopItem.isPublished">
              <p>Товар не опубликован</p>
              <v-btn
                color="primary"
                class="publish-btn"
                dark
                @click="openPublishShopItemModal"
              >
                Опубликовать
              </v-btn>
            </div>
            <v-btn color="primary" class="update-btn" @click="openChangeShopItemDataModal"
              >Изменить данные</v-btn
            >
          </v-col>
        </div>
      </div>
      <label class="text-caption d-block mt-3">Материалы</label>
      <assets-slider
        :mutable="true"
        type="shopItem"
        :shopItem="shopItem"
        @update="getShopItem"
      />
    </v-col>
    <v-divider vertical></v-divider>
    <v-col>
      <h2>Отзывы</h2>
      <reviews />
    </v-col>
    <upload-asset-modal
      :isOpened="isChangeShopItemAvatarModalOpened"
      @close="closeChangeShopItemAvatarModal"
      title="Изменение аватара товара"
      buttonLabel="Заменить"
    />
    <change-shop-item-data-modal
      :isOpened="isChangeShopItemDataModalOpened"
      :shopItem="shopItem"
      @close="closeChangeShopItemDataModal"
    />
    <confirmation-modal
      :isOpened="isDeleteShopItemModalOpened"
      @close="closeDeleteShopItemModal"
      @confirm="closeDeleteShopItemModal(true)"
      title="Удаление товара"
      text="Вы уверены, что хотите удалить товар? Это действие
        нельзя будет отменить"
      buttonLabel="Удалить"
    />
    <confirmation-modal
      :isOpened="isPublishShopItemModalOpened"
      @close="closePublishShopItemModal"
      @confirm="closePublishShopItemModal(true)"
      title="Публикация товара"
      text="Вы уверены, что хотите опубликовать товар? Это действие
        нельзя будет отменить"
      buttonLabel="Опубликовать"
    />
  </v-container>
</template>

<script>
import ConfirmationModal from "../components/ConfirmationModal.vue";
import UploadAssetModal from "../components/UploadAssetModal.vue";
import ChangeShopItemDataModal from "../components/ChangeShopItemDataModal.vue";
import AssetsSlider from "../components/AssetsSlider.vue";
import Reviews from "../components/Reviews.vue";

export default {
  components: {
    ConfirmationModal,
    UploadAssetModal,
    ChangeShopItemDataModal,
    AssetsSlider,
    Reviews,
  },
  data() {
    return {
      isAccessAllowed: false,
      isChangeShopItemAvatarModalOpened: false,
      isChangeShopItemDataModalOpened: false,
      isDeleteShopItemModalOpened: false,
      isPublishShopItemModalOpened: false,
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
        this.sellerProfile = (await this.$api.getUserSellerProfile()).data;
      });
    },

    openChangeShopItemAvatarModal() {
      this.isChangeShopItemAvatarModalOpened = true;
    },

    closeChangeShopItemAvatarModal(value) {
      this.isChangeShopItemAvatarModalOpened = false;
      if (value) {
        this.$callWithErrorHandler(async () => {
          await this.$api.updateShopItemAvatar({ avatar: value }, this.shopItem.id);
          this.getShopItem();
        });
      }
    },

    openChangeShopItemDataModal() {
      this.isChangeShopItemDataModalOpened = true;
    },

    closeChangeShopItemDataModal(value) {
      this.isChangeShopItemDataModalOpened = false;
      if (value) {
        this.getShopItem();
      }
    },

    openDeleteShopItemModal() {
      this.isDeleteShopItemModalOpened = true;
    },

    closeDeleteShopItemModal(value) {
      this.isDeleteShopItemModalOpened = false;
      if (value) {
        this.$callWithErrorHandler(async () => {
          await this.$api.deleteShopItem(this.shopItem.id);
          this.$router.push("/seller-profile");
        });
      }
    },

    openPublishShopItemModal() {
      this.isPublishShopItemModalOpened = true;
    },

    closePublishShopItemModal(value) {
      this.isPublishShopItemModalOpened = false;
      if (value) {
        this.$callWithErrorHandler(async () => {
          await this.$api.updateShopItem({
            ...this.shopItem,
            category: this.shopItem.ShopItemCategory,
            isPublished: true,
          });
          this.getShopItem();
        });
      }
    },
  },

  async beforeMount() {
    await this.getShopItem();
    await this.getSellerProfile();
    if (this.shopItem.ownerId === this.sellerProfile.id) {
      this.isAccessAllowed = true;
    } else {
      this.$router.push(`/shop-item/${this.$route.params.id}`);
    }
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

.update-btn {
  display: block;
  margin-top: 32px;
}

.publish-btn {
  display: block;
  margin-top: 20px;
}
</style>