<template>
  <div class="sort">
    <v-btn elevation="0" color="primary" fab small @click="openSort">
      <v-icon>mdi-sort</v-icon>
    </v-btn>
    <v-dialog v-model="isSortOpened" max-width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Сортировка </v-card-title>
        <v-radio-group v-model="pickedSort" class="pl-4">
        <p v-if="type === 'sellers' && (!isAuth || !userData || !userData.Address)">
          Авторизуйтесь и укажите свой адрес, чтобы сортировать продавцов по
          расстоянию до вас
        </p>
          <v-radio
            v-for="sort in currentSorts"
            :key="`sort-${sort.id}`"
            :label="sort.name"
            :value="sort.id"
          ></v-radio>
        </v-radio-group>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeSort(true)">Применить</v-btn>
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
      isSortOpened: false,
      sorts: [
        {
          id: 1,
          name: "По дате создания(сначала новые)",
          key: "createdAtAsc",
        },
        {
          id: 2,
          name: "По дате создания(сначала старые)",
          key: "createdAtDesc",
        },
        {
          id: 3,
          name: "По дате изменения(сначала новые)",
          key: "updatedAtAsc",
        },
        {
          id: 4,
          name: "По дате изменения(сначала старые)",
          key: "updatedAtDesc",
        },
        {
          id: 5,
          name: "По возрастанию цены",
          key: "priceAsc",
        },
        {
          id: 6,
          name: "По убыванию цены",
          key: "priceDesc",
        },
        {
          id: 7,
          name: "По расстоянию до меня",
          key: "near",
        },
      ],
      pickedSort: null,
    };
  },
  computed: {
    currentSorts() {
      if (this.type === "shopItems") {
        return this.sorts.slice(0,6);
      } else if(this.isAuth && this.userData.Address) {
        return [...this.sorts.slice(0, 4), this.sorts[6]];
      } else {
        return this.sorts.slice(0, 4);
      }
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userData() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    openSort() {
      this.isSortOpened = true;
    },

    closeSort(value) {
      this.isSortOpened = false;
      if (value) {
        this.$emit(
          "update",
          this.sorts.find((sort) => sort.id === this.pickedSort)
        );
      }
    },
  },
};
</script>

<style scoped>
.sort {
  margin: 0 8px 0 8px;
}
</style>