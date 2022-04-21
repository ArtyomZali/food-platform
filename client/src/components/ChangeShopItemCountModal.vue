<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение количества товара {{ shopItem ? shopItem.name : "f" }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            label="Количество"
            v-model="count"
            :rules="countInputRules"
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
          @click="changeShopItemCount"
          :disabled="!isFormValid"
          >Изменить</v-btn
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
    shopItem: {
      type: Object | null,
      required: true,
    },
  },
  data() {
    return {
      countInputRules: [
        (value) => !!value || "Заполните поле",
        (value) => +value >= 0 || "Значение не может быть отрицательным!",
        (value) => {
          return (
            (this.shopItem.isUnitInteger && Number.isInteger(+value)) ||
            !this.shopItem.isUnitInteger ||
            "Товар продается штучно!"
          );
        },
      ],
      count: "",
      isFormValid: false,
    };
  },

  methods: {
    async changeShopItemCount() {
      console.log(1);
      this.$emit("close", { ...this.shopItem, count: this.count });
    },
  },

  watch: {
    shopItem(value) {
      if (value) {
        this.count = this.shopItem.count;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style> 