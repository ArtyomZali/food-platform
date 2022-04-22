<template>
  <v-card class="shop-item-card" @click="openSellerPage">
    <v-img :src="sellerAvatar" class="shop-item-image"></v-img>
    <h3>{{ seller && seller.name }}</h3>
    <div class="mt-2" v-if="seller && seller.SellerProfileCategories.length">
      <v-chip
        v-for="category in seller.SellerProfileCategories"
        :key="`seller-profile-category-chip-${category.id}`"
        color="primary"
        class="category-chip"
        label
        outlined
        >{{ category.name }}
      </v-chip>
    </div>
    <p class="shop-item-description">{{ seller && seller.description }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openSellerPage() {
      this.$router.push(`/seller/${this.seller.id}`);
    },
  },
  computed: {
    sellerAvatar() {
      return this.seller?.avatar
        ? `${this.$api.BASE_URL}${this.seller.avatar}`
        : require("@/assets/default.png");
    },
  },
};
</script>

<style scoped>
.shop-item-card {
  height: 400px;
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


.category-chip {
  margin: 0 12px 12px 0;
}
</style>