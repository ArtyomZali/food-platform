<template>
  <v-expansion-panels elevation="2">
    <v-expansion-panel
      elevation="2"
      v-for="purchase in purchases"
      :key="`purchases-${purchase.id}`"
    >
      <v-expansion-panel-header elevation="2" class="expansion-header">
        <div class="seller-basket-info">
          <v-img
            class="user-avatar"
            max-width="64"
            :src="sellerAvatar(purchase.SellerProfile)"
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
            <p>Цена: {{ item.count * item.ShopItem.price }}р</p>
          </div>
        </div>
        <p>Итого: {{ purchaseSum(purchase) }}p</p>
        <v-btn
          v-if="purchase.status !== 'canceled'"
          class="purchase-btn"
          color="primary"
          @click="openCancelPurchaseModal(purchase)"
          >Отменить</v-btn
        >
        <v-btn
          v-if="purchase.SellerProfile.Address"
          color="secondary"
          @click="openAddressModal(purchase.SellerProfile.Address)"
        >
          Показать адрес
        </v-btn>
        <v-btn
          class="purchase-btn"
          color="secondary"
          @click="openChat(purchase.SellerProfile)"
        >
          Перейти в чат
        </v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <confirmation-modal
      :isOpened="isCancelPurchaseModalOpened"
      title="Отмена заказа"
      text="Вы уверены, что хотите отменить заказ?"
      buttonLabel="Отменить"
      @close="closeCancelPurchaseModal"
      @confirm="closeCancelPurchaseModal(true)"
    />
    
    <address-modal
      :isOpened="isAddressModalOpened"
      :address="currentAddress"
      @close="closeAddressModal"
    />
  </v-expansion-panels>
</template>

<script>
import ConfirmationModal from "./ConfirmationModal.vue";
import AddressModal from "./AddressModal.vue";

export default {
  components: {
    ConfirmationModal,
    AddressModal
  },
  data() {
    return {
      isCancelPurchaseModalOpened: false,
      currentPurchase: null,
      purchases: [],
      isAddressModalOpened: false,
      currentAddress: null,
    };
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

    purchaseSum(purchase) {
      let sum = 0;
      purchase.PurchaseShopItems.forEach((item) => {
        sum += item.count * item.ShopItem.price;
      });
      return sum.toFixed(0);
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
            status: "canceled",
          });
          this.getUserPurchases();
        });
      }
      this.currentPurchase = null;
    },
    openChat(sellerProfile) {
      this.$callWithErrorHandler(async () => {
        let chat = (
          await this.$api.getChatBySellerAndCustomerIds(
            sellerProfile.id,
            this.$store.getters.userData.id
          )
        ).data;
        if (!chat) {
          chat = (
            await this.$api.createChat({
              sellerId: sellerProfile.id,
              customerId: this.$store.getters.userData.id,
            })
          ).data;
        }
        this.$router.push(`/chat/${chat.id}`);
      });
    },
    openAddressModal(address) {
      this.currentAddress = [address.x, address.y];
      this.isAddressModalOpened = true;
    },
    closeAddressModal() {
      this.currentAddress = null;
      this.isAddressModalOpened = false;
    },
  },
  beforeMount() {
    this.getUserPurchases();
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
  margin: 0 16px 0 0;
}

.expansion-header {
  border: 1px solid #eee;
}

.expansion-content {
  border: 1px solid #eee;
  border-top: none;
}
.v-btn {
  margin-right: 8px;
}
</style>