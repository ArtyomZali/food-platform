<template>
  <v-card class="shop-item-card" @click="openShopItemPage">
    <v-img :src="shopItemAvatar" class="shop-item-image"></v-img>
    <h3>{{ shopItem && shopItem.name }}</h3>
    <p>{{shopItem && shopItem.price}}р за {{shopItem && shopItem.unitName}}</p>
    <v-chip
      color="primary"
      class="category-chip mb-2"
      label
      outlined
      v-if="shopItem && shopItem.ShopItemCategory"
      >{{ shopItem.ShopItemCategory.name }}
    </v-chip>
    <p class="shop-item-description">{{ shopItem && shopItem.description }}</p>
    <v-divider></v-divider>
    <div class="rate-block">
      <h5 v-if="shopItem && !shopItem.Reviews.length">Товар еще не оценен</h5>
      <div v-else>
        <h4>Средняя оценка: {{ averageReview }}</h4>
        <v-rating
          half-increments
          readonly
          length="5"
          size="32"
          :value="averageReview"
        ></v-rating>
      </div>
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
  methods: {
    openShopItemPage() {
      this.$router.push(`/shop-item/${this.shopItem.id}`);
    },
  },
  computed: {
    shopItemAvatar() {
      return this.shopItem?.avatar
        ? `${this.$api.BASE_URL}${this.shopItem.avatar}`
        : require("@/assets/default.png");
    },

    averageReview() {
      return this.shopItem?.Reviews?.reduce((a, b) => {
        return a + b.grade / this.shopItem.Reviews.length;
      }, 0).toFixed(1);
    },
  },
};
</script>

<style scoped>
.shop-item-card {
  height: 500px;
  padding: 16px;
  cursor: pointer;
  position: relative;
}

.shop-item-image {
  height: 160px;
}

.shop-item-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.rate-block {
  padding: 16px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>