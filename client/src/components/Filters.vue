<template>
  <div>
    <v-btn elevation="0" color="primary" fab small @click="openFilters">
      <v-icon>mdi-tune</v-icon>
    </v-btn>
    <v-dialog v-model="isFiltersOpened" max-width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Фильтры </v-card-title>

        <div v-if="type === 'sellers'" class="pl-4">
          <v-checkbox
            v-for="category in categories"
            :key="`seller-filter-${category.id}`"
            v-model="category.picked"
            :label="category.name"
          ></v-checkbox>
        </div>
        <v-expansion-panels v-else>
          <v-expansion-panel
            v-for="category in categories"
            :key="`seller-filter-expansion-panel-${category.id}`"
          >
            <v-expansion-panel-header>
              {{ category.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-checkbox
                v-for="shopItemCategory in category.ShopItemCategories"
                :key="`shop-item-filter-${shopItemCategory.id}`"
                v-model="shopItemCategory.picked"
                :label="shopItemCategory.name"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeFilters(true)"
            >Применить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFiltersOpened: false,
      categories: [],
    };
  },
  methods: {
    async getExtendedSellerProfileCategories() {
      this.categories = (
        await this.$api.getExtendedSellerProfileCategories()
      ).data;
    },

    openFilters() {
      this.isFiltersOpened = true;
    },

    closeFilters(value) {
      this.isFiltersOpened = false;
      if (value) {
        this.$emit("update", this.pickedCategories);
      }
    },
  },

  computed: {
    pickedCategories() {
      if (this.type === "sellers") {
        return this.categories.filter((category) => category.picked);
      } else {
        const categories = [];
        this.categories.forEach((category) => {
          categories.push(...category.ShopItemCategories);
        });
        return categories.filter((category) => category.picked);
      }
    },
  },

  beforeMount() {
    this.getExtendedSellerProfileCategories();
  },
};
</script>

<style>
</style>