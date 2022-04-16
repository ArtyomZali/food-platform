<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение личных данных
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            label="Имя"
            v-model="name"
            :rules="nameInputRules"
            validate-on-blur
          ></v-text-field>
          <v-text-field
            label="Адрес электронной почты"
            v-model="email"
            :rules="emailInputRules"
            validate-on-blur
          ></v-text-field>
          <v-checkbox v-model="noAddress" label="Не хочу указывать адрес"></v-checkbox>
        </v-form>
        <yandex-map v-if="!noAddress" :coords="address" :zoom="10" @click="changeCoords">
          <ymap-marker :coords="address" marker-id="123" />
        </yandex-map>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="updateUserData"
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
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      email: "",
      address: [54.82896654088406, 39.831893822753904],
      isFormValid: false,
      isLoading: false,
      noAddress: false,
      nameInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length >= 3 || "Минимальное число символов - 3",
        (value) =>
          (value || "").length <= 20 || "Максимальное число символов - 20",
      ],
      emailInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length <= 20 || "Максимальное число символов - 20",
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Некорректная почта";
        },
      ],
    };
  },

  methods: {
    changeCoords(e) {
      this.address = e.get("coords");
    },
    async updateUserData() {
      if (this.isFormValid) {
        this.isLoading = true;
        await this.$callWithErrorHandler(async () => {
          await this.$api.updateUserData({ name: this.name, email: this.email });
          if (this.address && !this.noAddress) {
            await this.$api.updateUserAddress({
              x: this.address[0],
              y: this.address[1],
            });
          }
        });
        this.isLoading = false;
        this.$emit('close');
      }
    },
  },

  watch: {
    isOpened() {
      this.name = this.user.name;
      this.email = this.user.email;
      if (this.user.Address) {
        this.address = [this.user.Address.x, this.user.Address.y];
      }
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 200px;
}
</style>