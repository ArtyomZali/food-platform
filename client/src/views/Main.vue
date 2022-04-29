<template>
  <v-container>
    <v-tabs v-model="currentTab" centered>
      <v-tab v-for="tab in tabs" :key="`profile-page-tab-${tab.id}`">{{
        tab.title
      }}</v-tab>
    </v-tabs>
    <v-row class="search-row">
      <filters :type="tabs[currentTab].key" @update="updateFilters" />
      <sort :type="tabs[currentTab].key" @update="updateSort" />
      <search @update="updateSearch" />
    </v-row>
    <v-row class="content-row">
      <div v-if="tabs[currentTab].key === 'shopItems'" class="grid">
        <shop-item-card
          v-for="shopItem in shopItems"
          :key="`shop-item-card-${shopItem.id}`"
          :shopItem="shopItem"
        />
      </div>
      <div v-else class="grid">
        <seller-card
          v-for="seller in sellers"
          :key="`seller-card-${seller.id}`"
          :seller="seller"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Sort from "../components/Sort.vue";
import Filters from "../components/Filters.vue";
import Search from "../components/Search.vue";
import SellerCard from "../components/SellerCard.vue";
import ShopItemCard from "../components/ShopItemCard.vue";
export default {
  components: { Filters, Sort, Search, SellerCard, ShopItemCard },
  data() {
    return {
      tabs: [
        {
          id: 1,
          title: "Товары",
          key: "shopItems",
        },
        {
          id: 2,
          title: "Продавцы",
          key: "sellers",
        },
      ],
      currentTab: 0,
      shopItems: [],
      sellers: [],
      filters: [],
      sort: null,
      search: "",
    };
  },
  methods: {
    getData() {
      this.tabs[this.currentTab].key === "shopItems"
        ? this.getShopItems()
        : this.getSellerProfiles();
    },
    async getShopItems() {
      this.$callWithErrorHandler(async () => {
        this.shopItems = (await this.$api.getShopItems(this.currentQuery)).data;
      });
    },
    async getSellerProfiles() {
      this.$callWithErrorHandler(async () => {
        this.sellers = (
          await this.$api.getSellerProfiles(this.currentQuery)
        ).data;
      });
    },
    updateFilters(value) {
      this.filters = value;
      this.getData();
    },
    updateSort(value) {
      this.sort = value;
      this.getData();
    },
    updateSearch(value) {
      this.search = value;
      this.getData();
    },
  },

  computed: {
    currentQuery() {
      let query = "?categories=";
      this.filters.forEach((category, index) => {
        query += `${category.id}${
          index === this.filters.length - 1 ? "" : ","
        }`;
      });
      if (this.sort) {
        query += `&sort=${this.sort.key}`;
      }
      if (this.search) {
        query += `&search=${this.search}`;
      }
      return query;
    },
  },

  watch: {
    currentTab() {
      this.sort = null;
      this.filters = [];
      this.search = null;
      this.getData();
    },
  },

  beforeMount() {
    this.getData();
  },
};
</script>

<style scoped>
.search-row {
  justify-content: center;
  margin-top: 64px;
}

.grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 16px;
  width: 100%;
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: 50% 50%;
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 100%;
    padding: 16px;
  }
}

@media (min-width: 1650px) {
  .container {
    max-width: 1185px;
  }
}
</style>