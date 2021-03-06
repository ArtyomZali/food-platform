<template>
  <v-expansion-panels elevation="2">
    <v-expansion-panel
      elevation="2"
      v-for="order in orders"
      :key="`orders-${order.id}`"
    >
      <v-expansion-panel-header elevation="2" class="expansion-header">
        <div class="user-basket-info">
          <v-img
            class="user-avatar"
            max-width="64"
            :src="userAvatar(order.User)"
          ></v-img>
          <h4>{{ order.User.name }}</h4>

          <v-chip color="primary" class="ml-4" label outlined
            >{{ orderStatus(order.status) }}
          </v-chip>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="expansion-content">
        <div
          v-for="item in order.PurchaseShopItems"
          :key="`orders-${order.id}-shop-item-${item.id}`"
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
          v-if="!['canceled', 'done'].includes(order.status)"
          color="primary"
          @click="openChangeOrderStatusModal(order)"
          >Изменить статус</v-btn
        >
        <v-btn
            color="primary"
            link
            text
            :to="`/chats/${order.User.id}`"
        >
            Перейти в чат
        </v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <change-order-status-modal
        :isOpened="isChangeOrderStatusModalOpened"
        :order="currentOrder"
        @close="closeChangeOrderStatusModal"
    />
  </v-expansion-panels>
</template>

<script>
import ChangeOrderStatusModal from './ChangeOrderStatusModal.vue';

export default {
  components: {
    ChangeOrderStatusModal
  },
  data() {
    return {
      isChangeOrderStatusModalOpened: false,
      currentOrder: null,
      orders: [],
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
    orderStatus(status) {
      const map = {
        created: "Создано",
        done: "Выполнен",
        process: "Принят в работу",
        canceled: "Отменен",
      };
      return map[status];
    },
    getUserOrders() {
      this.$callWithErrorHandler(async () => {
        this.orders = (await this.$api.getUserOrders()).data;
      });
    },
    openChangeOrderStatusModal(order) {
      this.currentOrder = order;
      this.isChangeOrderStatusModalOpened = true;
    },
    closeChangeOrderStatusModal(value) {
      this.isChangeOrderStatusModalOpened = false;
      if (value) {
        this.$callWithErrorHandler(async () => {
          await this.$api.updatePurchaseStatus({
            id: this.currentOrder.id,
            status: value
          });
          this.getUserOrders();
        });
      }
      this.currentOrder = null;
    },
  },
  beforeMount() {
    this.getUserOrders();
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

.order-btn {
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