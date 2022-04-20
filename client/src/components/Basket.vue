<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="seller in basket"
      :key="`seller-basket-panel-${seller.id}`"
    >
      <v-expansion-panel-header>
        <div class="seller-basket-info">
          <v-img
            class="user-avatar"
            max-width="64"
            :src="sellerAvatar(seller)"
          ></v-img>
          <h4>{{ seller.name }}</h4>
          <v-btn class="remove-btn" text @click="removeSeller(seller)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div
          v-for="item in seller.shopItems"
          :key="`seller-${seller.id}-shop-item-${item.id}`"
        >
          <v-img
            class="user-avatar"
            max-width="64"
            :src="shopItemAvatar(item)"
          ></v-img>
          <h4>{{ item.name }}</h4>
          <v-btn class="remove-btn" text @click="removeShopItem(item)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <v-btn color="primary" @click="purchaseItems">Заказать</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  computed: {
    basket() {
      return this.$store.getters.getBasket;
    },
  },
  removeShopItem(item) {},
  removeSeller(seller) {},
  changeCount() {},
  purchaseItems(seller) {},
};
</script>

<style>
</style>