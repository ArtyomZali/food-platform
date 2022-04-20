<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Создание оценки
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            label="Описание"
            v-model="text"
            :rules="textInputRules"
            validate-on-blur
          ></v-text-field>
          <v-input :value="grade" :rules="gradeInputRules">
            <v-rating v-model="grade" color="primary" large></v-rating>
          </v-input>
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
    shopItem: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
      text: "",
      grade: 0,
      isFormValid: false,
      isLoading: false,
      textInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length >= 3 || "Минимальное число символов - 3",
        (value) =>
          (value || "").length <= 300 || "Максимальное число символов - 300",
      ],
      gradeInputRules: [
          (value) => !!value || "Заполните поле"
      ]
    };
  },

  methods: {
    async createShopItem() {
      if (this.isFormValid) {
        this.isLoading = true;
        await this.$callWithErrorHandler(async () => {
          await this.$api.createReview({
            text: this.text,
            grade: this.grade,
            shopItemId: this.shopItem.id
          });
        });
        this.isLoading = false;
        this.$emit("close", true);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>