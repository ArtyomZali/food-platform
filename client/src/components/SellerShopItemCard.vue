<template>
  <v-card class="seller-shop-item-card" @click="redirectToShopItemPage">
    <v-img
      class="seller-shop-item-card__image"
      :src="shopItemAvatarSrc"
      max-width="128"
    ></v-img>
    <div class="seller-shop-item-card__main-info">
      <h3>{{ shopItem.name }}</h3>
      <p>{{ shopItem.price }}р за {{shopItem.unitName}}</p>
      <v-chip
        v-if="shopItem.ShopItemCategory"
        color="primary"
        class="category-chip"
        label
        outlined
        >{{ shopItem.ShopItemCategory.name }}
      </v-chip>
    </div>
    <div class="seller-shop-item-card__additional-info">
      <p>Осталось: {{ shopItem.count }} ({{ shopItem.unitName }})</p>
      <v-chip color="primary" class="category-chip" label outlined
        >{{ shopItem.isPublished ? "Опубликован" : "Не опубликован" }}
      </v-chip>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    shopItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    shopItemAvatarSrc() {
      return this.shopItem?.avatar
        ? `${this.$api.BASE_URL}${this.shopItem.avatar}`
        : require("@/assets/default.png");
    },
  },

  methods: {
    redirectToShopItemPage() {
      this.$router.push(`/seller-shop-item/${this.shopItem.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.seller-shop-item-card {
  display: flex;
  height: 160px;
  padding: 16px;
  margin-bottom: 32px;
  cursor: pointer;

  &__image {
    height: 128px;
    width: 128px;
    margin-right: 16px;
  }

  &__main-info {
    height: 100%;
    margin-right: auto;

    h3 {
      margin-bottom: 12px;
    }
  }

  &__additional-info {
    height: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>