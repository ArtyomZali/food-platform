<template>
  <v-card outlined class="auth-card" elevation="10">
    <h1 class="auth-card__title">Авторизация</h1>
    <v-form v-model="isInputValid">
      <v-text-field
        label="Адрес электронной почты"
        v-model="email"
        :rules="emailInputRules"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        label="Пароль"
        type="password"
        v-model="password"
        :rules="passwordInputRules"
        validate-on-blur
      ></v-text-field>
    </v-form>
    <v-btn
      @click="signIn"
      tile
      color="primary"
      :loading="isLoading"
      :disabled="!isInputValid"
      class="auth-btn"
      >Войти</v-btn
    >
    <v-btn plain to="/auth/sign-up" link color="secondary" class="auth-btn"
      >Нет аккаунта? Зарегистрироваться</v-btn
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      isInputValid: false,
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
      passwordInputRules: [
        (value) => !!value || "Заполните поле",
        (value) =>
          (value || "").length >= 8 || "Минимальное число символов - 8",
        (value) =>
          (value || "").length <= 20 || "Максимальное число символов - 20",
        (value) => {
          const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
          return (
            pattern.test(value) ||
            "Пароль должен содержать минимум 1 цифр, 1 строчную и 1 заглавную буквы"
          );
        },
      ],
    };
  },

  methods: {
    async signIn() {
      this.isLoading = true;
      await this.$callWithErrorHandler(async () => {
        await this.$api.signIn({ email: this.email, password: this.password });
        await this.$api.checkAuth();
        this.$router.push("/");
      });
      this.isLoading = false;
    },
  },
};
</script>

<style>
.v-card.auth-card {
  width: 600px;
  padding: 2rem;
  margin: auto;
}

.v-btn.auth-btn {
  display: block;
  margin: 16px auto 0 auto;
}

.auth-card__title {
  text-align: center;
  margin-bottom: 24px;
}
</style>