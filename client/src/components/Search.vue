<template>
  <div class="search-container">
    <v-text-field v-model="searchString" placeholder="Введите ваш запрос"></v-text-field>
    <v-btn color="primary" @click="search">Найти</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchString: "",
    };
  },
  methods: {
    search() {
      this.$emit("update", this.searchString);
    },
  },
};
</script>

<style scoped lang="scss">
.search-container {
    display: flex;
    width: 300px;

    .v-text-field {
        padding-top: unset;
        margin-right: 8px;
    }
}
</style>