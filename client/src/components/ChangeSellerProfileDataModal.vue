<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение данных продавца
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
            v-model="pickedCategories"
            :items="categories"
            item-text="name"
            return-object
            multiple
            hint="Укажите категории товаров, которые вы продаете"
            persistent-hint
          ></v-select>
          <v-checkbox
            label="Не хочу указывать номер телефона"
            v-model="noPhone"
          ></v-checkbox>
          <div class="phone-input" v-if="!noPhone">
            <span class="text-h2 mr-2">+7</span>
            <v-otp-input
              label="Описание"
              length="10"
              type="number"
              v-model="phone"
              validate-on-blur
            ></v-otp-input>
          </div>
          <v-checkbox
            v-model="noAddress"
            label="Не хочу указывать адрес"
          ></v-checkbox>
        </v-form>
        <yandex-map
          v-if="!noAddress"
          :coords="address"
          :zoom="10"
          @click="changeCoords"
        >
          <ymap-marker :coords="address" marker-id="123" />
        </yandex-map>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="updateSellerProfileData"
          :loading="isLoading"
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
    sellerProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      description: "",
      address: [54.82896654088406, 39.831893822753904],
      isFormValid: false,
      isLoading: false,
      noAddress: false,
      phone: "",
      noPhone: false,
      nameInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length >= 3 || "Минимальное число символов - 3",
        (value) =>
          (value || "").length <= 40 || "Максимальное число символов - 40",
      ],
      descriptionInputRules: [(value) => !!value || "Заполните поле"],
      categories: [],
      pickedCategories: [],
    };
  },

  methods: {
    changeCoords(e) {
      this.address = e.get("coords");
    },
    async updateSellerProfileData() {
      if (this.isFormValid) {
        this.isLoading = true;
        await this.$callWithErrorHandler(async () => {
          await this.$api.updateSellerProfile({
            id: this.sellerProfile.id,
            name: this.name,
            description: this.description,
            phone: this.noPhone ? null : this.phone,
            categories: this.pickedCategories,
            isPublished: this.sellerProfile.isPublished
          });
          if (this.address && !this.noAddress) {
            await this.$api.updateSellerProfileAddress({
              x: this.address[0],
              y: this.address[1],
            });
          }
        });
        this.isLoading = false;
        this.$emit("close");
      }
    },
    async getSellerProfileCategories() {
      await this.$callWithErrorHandler(async () => {
        this.categories = (await this.$api.getSellerProfileCategories()).data;
      });
    },
  },

  beforeMount() {
    this.getSellerProfileCategories();
  },

  watch: {
    isOpened() {
      this.name = this.sellerProfile.name;
      this.description = this.sellerProfile.description;
      this.pickedCategories = this.sellerProfile.SellerProfileCategories.map(
        (category) => {
          const { SellerProfileCategory, ...rest } = category;
          return rest;
        }
      );
      this.phone = this.sellerProfile.phone;
      if (this.sellerProfile.Address) {
        this.address = [
          this.sellerProfile.Address.x,
          this.sellerProfile.Address.y,
        ];
      }
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 200px;
}
.phone-input {
  display: flex;
}
</style>