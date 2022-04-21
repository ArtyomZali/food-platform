<template>
  <v-expansion-panels elevation="2">
    <v-expansion-panel
      elevation="2"
      v-for="purchase in purchases"
      :key="`purchases-${purchase.id}`"
    >
      <v-expansion-panel-header elevation="2" class="expansion-header">
        <div class="user-basket-info">
          <v-img
            class="user-avatar"
            max-width="64"
            :src="userAvatar(purchase.SellerProfile)"
          ></v-img>
          <h4>{{ purchase.SellerProfile.name }}</h4>

          <v-chip color="primary" class="ml-4" label outlined
            >{{ purchaseStatus(purchase.status) }}
          </v-chip>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="expansion-content">
        <div
          v-for="item in purchase.PurchaseShopItems"
          :key="`purchases-${purchase.id}-shop-item-${item.id}`"
          class="shop-item-basket-info"
        >
          <v-img
            class="user-avatar"
            max-width="64"
            :src="shopItemAvatar(item.ShopItem)"
          ></v-img>
          <div>
            <h4>{{ item.ShopItem.name }}</h4>
            <span>Количество: {{ item.count }}</span>
          </div>
        </div>
        <v-btn
          v-if="['created', 'process'].includes(purchase.status)"
          class="purchase-btn"
          color="primary"
          @click="openCancelPurchaseModal(purchase)"
          >Отменить</v-btn
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <change-order-status-modal
        :isOpened="isCancelPurchaseModalOpened"
        :order="currentOrder"
        @close="closeCancelPurchaseModalOpened"
    />
  </v-expansion-panels>
</template>

<script>
import ConfirmationModal from './ConfirmationModal.vue';

export default {
  components: {
    ConfirmationModal
  },
  data() {
    return {
      isCancelPurchaseModalOpened: false,
      currentPurchase: null,
      purchases: [],
    };
  },
  methods: {
    userAvatar(user) {
      return user.avatar
        ? `${this.$api.BASE_URL}${user.avatar}`
        : require("@/assets/default.png");
    },
    shopItemAvatar(shopItem) {
      return shopItem.avatar
        ? `${this.$api.BASE_URL}${shopItem.avatar}`
        : require("@/assets/default.png");
    },
    purchaseStatus(status) {
      const map = {
        created: "Создано",
        done: "Выполнен",
        process: "Принят в работу",
        canceled: "Отменен",
      };
      return map[status];
    },
    getUserPurchases() {
      this.$callWithErrorHandler(async () => {
        this.purchases = (await this.$api.getUserPurchases()).data;
      });
    },
    openCancelPurchaseModal(purchase) {
      this.currentPurchase = purchase;
      this.isCancelPurchaseModalOpened = true;
    },
    closeCancelPurchaseModal(value) {
      this.isCancelPurchaseModalOpened = false;
      if (value) {
        this.$callWithErrorHandler(async () => {
          await this.$api.updatePurchaseStatus({
            id: this.currentPurchase.id,
            status: value
          });
          this.getUserPurchases();
        });
      }
      this.currentPurchase = null;
    },
  },
  beforeMount() {
    this.getUserPurchases();
  },
};
</script>

<style scoped lang="scss">
.user-basket-info {
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