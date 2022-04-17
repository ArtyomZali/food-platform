<template>
  <v-container class="slider-container">
    <vue-horizontal>
      <asset
        v-for="asset in assets"
        :key="`asset-${asset.link}`"
        :asset="asset"
        :mutable="true"
        @delete="showDeleteAssetModal(asset)"
        @show="showAsset(asset)"
        :size="size"
      />
      <button
        :class="`add-asset-btn add-asset-btn--${size}`"
        @click="openUploadAssetModal"
      >
        +
      </button>
    </vue-horizontal>
    <upload-asset-modal
      @close="closeUploadAssetModal"
      :isOpened="isUploadAssetModalOpened"
      title="Загрузка материала"
      buttonLabel="Загрузить"
      :isVideoAllowed="true"
    />
    <asset-modal
      @close="closeAssetModal"
      :asset="currentAsset"
      :isOpened="isAssetModalOpened"
    />
    <confirmation-modal
      :isOpened="isDeleteAssetModalOpened"
      @close="closeDeleteAssetModal"
      @confirm="deleteAsset"
      title="Удаление материала"
      text="Вы уверены, что хотите удалить материал?"
      buttonLabel="Удалить"
    />
  </v-container>
</template>

<script>
import Asset from "./Asset.vue";
import UploadAssetModal from "./UploadAssetModal.vue";
import AssetModal from "./AssetModal.vue";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  components: {
    Asset,
    UploadAssetModal,
    AssetModal,
    ConfirmationModal,
  },
  props: {
    mutable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    sellerProfile: {
      type: Object,
    },
    shopItem: {
      type: Object,
    },
    size: {
      type: String,
      default: "sm",
    },
  },
  data() {
    return {
      isUploadAssetModalOpened: false,
      isAssetModalOpened: false,
      isDeleteAssetModalOpened: false,
      currentAsset: null,
    };
  },

  methods: {
    openUploadAssetModal() {
      this.isUploadAssetModalOpened = true;
    },

    showAsset(asset) {
      this.currentAsset = asset;
      this.isAssetModalOpened = true;
    },

    closeAssetModal() {
      this.isAssetModalOpened = false;
    },

    async closeUploadAssetModal(value) {
      if (value) {
        this.type === "sellerProfile"
          ? await this.addSellerProfileAsset(value)
          : await this.addShopItemAsset(value);
      }
      this.isUploadAssetModalOpened = false;
    },

    async addSellerProfileAsset(value) {
      await this.$callWithErrorHandler(async () => {
        await this.$api.createSellerProfileAsset({ asset: value });
        this.$emit("update");
      });
    },

    async addShopItemAsset(value) {
      await this.$callWithErrorHandler(async () => {
        await this.$api.createShopItemAsset({ asset: value }, this.shopItem.id);
        this.$emit("update");
      });
    },

    showDeleteAssetModal(asset) {
      this.currentAsset = asset;
      this.isDeleteAssetModalOpened = true;
    },

    closeDeleteAssetModal() {
      this.isDeleteAssetModalOpened = false;
    },

    async deleteAsset() {
      this.type === "sellerProfile"
        ? await this.deleteSellerProfileAsset(this.currentAsset)
        : await this.deleteShopItemAsset(this.currentAsset);
      this.isDeleteAssetModalOpened = false;
    },

    async deleteSellerProfileAsset(asset) {
      await this.$callWithErrorHandler(async () => {
        await this.$api.deleteSellerProfileAsset(asset.id);
        this.$emit("update");
      });
    },

    async deleteShopItemAsset(asset) {
      await this.$callWithErrorHandler(async () => {
        await this.$api.deleteShopItemAsset(asset.id);
        this.$emit("update");
      });
    },
  },

  computed: {
    assets() {
      return this.sellerProfile
        ? this.sellerProfile.SellerProfileAssets
        : this.shopItem.ShopItemAssets;
    },
  },
};
</script>

<style scoped>
.slider-container {
  max-width: 500px;
  margin: unset;
}
.add-asset-btn {
  color: #aaa;
  border: 4px dashed #aaa;
  cursor: pointer;
}

.add-asset-btn--sm {
  width: 120px;
  height: 120px;
  font-size: 64px;
}

.add-asset-btn--lg {
  width: 360px;
  height: 360px;
  font-size: 192px;
}
</style>