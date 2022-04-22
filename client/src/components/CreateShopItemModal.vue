<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Создание товара
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            label="Название"
            v-model="name"
            :rules="nameInputRules"
            validate-on-blur
          ></v-text-field>
          <v-text-field
            label="Описание"
            v-model="description"
            :rules="descriptionInputRules"
            validate-on-blur
          ></v-text-field>
          <v-select
            v-model="pickedCategory"
            :items="categories"
            item-text="name"
            return-object
            hint="Укажите категорию товара"
            persistent-hint
          ></v-select>
          <v-text-field
            label="Количество"
            v-model="count"
            :rules="countInputRules"
            validate-on-blur
          ></v-text-field>
          <v-checkbox
            v-model="isUnitInteger"
            label="Продается штучно"
          ></v-checkbox>
          <v-text-field
            label="Единица измерения"
            v-model="unitName"
            :rules="unitNameInputRules"
            validate-on-blur
          ></v-text-field>
          <v-text-field
            label="Цена"
            v-model="price"
            :rules="priceInputRules"
            validate-on-blur
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="createShopItem"
          :loading="isLoading"
          :disabled="!isFormValid"
          >Создать</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      description: "",
      isFormValid: false,
      isLoading: false,
      nameInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length >= 3 || "Минимальное число символов - 3",
        (value) =>
          (value || "").length <= 40 || "Максимальное число символов - 40",
      ],
      descriptionInputRules: [(value) => !!value || "Заполните поле"],
      unitNameInputRules: [(value) => !!value || "Заполните поле"],
      countInputRules: [
        (value) => !!value || "Заполните поле",
        (value) => +value >= 0 || "Значение не может быть отрицательным!",
      ],
      priceInputRules: [
        (value) => !!value || "Заполните поле",
        (value) => +value >= 0 || "Значение не может быть отрицательным!",
      ],
      price: "",
      categories: [],
      pickedCategory: null,
      count: "",
      unitName: "",
      isUnitInteger: false,
    };
  },

  methods: {
    async createShopItem() {
      if (this.isFormValid) {
        this.isLoading = true;
        await this.$callWithErrorHandler(async () => {
          await this.$api.createShopItem({
            name: this.name,
            description: this.description,
            category: this.pickedCategory,
            count: this.count,
            isPublished: false,
            unitName: this.unitName,
            isUnitInteger: this.isUnitInteger,
            price: this.price
          });
        });
        this.isLoading = false;
        this.$emit("close", true);
      }
    },

    async getShopItemCategories() {
      await this.$callWithErrorHandler(async () => {
        this.categories = (await this.$api.getShopItemCategories()).data;
      });
    },
  },

  beforeMount() {
    this.getShopItemCategories();
  },
};
</script>

<style scoped lang="scss">
</style>