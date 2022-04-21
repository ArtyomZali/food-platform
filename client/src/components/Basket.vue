<template>
  <v-expansion-panels elevation="2">
    <v-expansion-panel
      elevation="2"
      v-for="seller in basket"
      :key="`seller-basket-panel-${seller.id}`"
    >
      <v-expansion-panel-header elevation="2" class="expansion-header">
        <div class="seller-basket-info">
          <v-img
            class="user-avatar"
            max-width="64"
            :src="sellerAvatar(seller)"
          ></v-img>
          <h4>{{ seller.name }}</h4>
          <v-btn
            class="remove-btn"
            x-small
            text
            @click="removeSellerFromBasket(seller)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="expansion-content">
        <div
          v-for="item in seller.shopItems"
          :key="`seller-${seller.id}-shop-item-${item.id}`"
          class="shop-item-basket-info"
        >
          <v-img
            class="user-avatar"
            max-width="64"
            :src="shopItemAvatar(item)"
          ></v-img>
          <div>
            <h4>{{ item.name }}</h4>
            <span>Количество: {{ item.count }}</span>
          </div>
          <v-btn
            class="ml-4"
            color="secondary"
            x-small
            @click="openChangeShopItemCountModal(item)"
            >Изменить количество</v-btn
          >
          <v-btn class="remove-btn" text @click="removeShopItemFromBasket(item)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <v-btn
          class="purchase-btn"
          color="primary"
          @click="purchaseItems(seller)"
          >Заказать</v-btn
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <change-shop-item-count-modal
      :isOpened="isChangeShopItemCountModalOpened"
      :shopItem="currentShopItem"
      @close="closeChangeShopItemCountModal"
    />
  </v-expansion-panels>
</template>

<script>
import ChangeShopItemCountModal from "./ChangeShopItemCountModal.vue";

export default {
  components: {
    ChangeShopItemCountModal,
  },
  data() {
    return {
      isChangeShopItemCountModalOpened: false,
      currentShopItem: null,
    };
  },
  computed: {
    basket() {
      return this.$store.getters.basket;
    },
  },
  methods: {
    sellerAvatar(seller) {
      return seller.avatar
        ? `${this.$api.BASE_URL}${seller.avatar}`
        : require("@/assets/default.png");
    },
    shopItemAvatar(shopItem) {
      return shopItem.avatar
        ? `${this.$api.BASE_URL}${shopItem.avatar}`
        : require("@/assets/default.png");
    },
    openChangeShopItemCountModal(item) {
      this.isChangeShopItemCountModalOpened = true;
      this.currentShopItem = item;
    },
    closeChangeShopItemCountModal(value) {
      this.isChangeShopItemCountModalOpened = false;
      this.currentShopItem = null;
      if (value) {
        this.$store.dispatch("changeShopItemCount", value);
      }
    },
    removeShopItemFromBasket(item) {
      this.$store.dispatch("removeShopItemFromBasket", item);
    },
    removeSellerFromBasket(seller) {
      this.$store.dispatch("removeSellerFromBasket", seller);
    },
    purchaseItems(seller) {
      this.$callWithErrorHandler(async () => {
        console.log(seller);
        this.$api.createPurchase(seller.shopItems);
        this.$store.dispatch("removeSellerFromBasket", seller);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.seller-basket-info {
  display: flex;
  padding: 12px;
  align-items: center;
  position: relative;
}

.shop-item-basket-info {
  display: flex;
  padding: 12px;
  align-items: center;
  position: relative;
}

.user-avatar {
  margin-right: 16px;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: -32px;
}

.purchase-btn {
  display: block;
  margin-left: auto;
}

.expansion-header {
  border: 1px solid #eee;
}

.expansion-content {
  border: 1px solid #eee;
  border-top: none;
}
</style>