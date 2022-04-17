<template>
  <v-container>
    <seller-shop-item-card
      v-for="shopItem in shopItems"
      :key="`shop-item-${shopItem.id}`"
      :shopItem="shopItem"
    ></seller-shop-item-card>
    <v-btn
      color="primary"
      class="add-shop-item-btn"
      @click="openCreateShopItemModal"
      >Добавить товар</v-btn
    >
    <create-shop-item-modal
      :isOpened="isCreateShopItemModalOpened"
      :sellerProfile="sellerProfile"
      @close="closeCreateShopItemModal"
    ></create-shop-item-modal>
  </v-container>
</template>

<script>
import SellerShopItemCard from "./SellerShopItemCard.vue";
import CreateShopItemModal from "./CreateShopItemModal.vue";
export default {
  components: {
    SellerShopItemCard,
    CreateShopItemModal,
  },

  props: {
    sellerProfile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isCreateShopItemModalOpened: false,
      shopItems: [],
    };
  },

  methods: {
    openCreateShopItemModal() {
      this.isCreateShopItemModalOpened = true;
    },

    closeCreateShopItemModal(isUpdate) {
      this.isCreateShopItemModalOpened = false;
      if (isUpdate) {
        this.getShopItems();
      }
    },

    async getShopItems() {
      this.$callWithErrorHandler(async () => {
        this.shopItems = (await this.$api.getUserShopItems()).data;
      });
    },
  },

  beforeMount() {
    this.getShopItems();
  },
};
</script>

<style scoped>
.add-shop-item-btn {
  display: block;
  margin: auto;
}
</style>