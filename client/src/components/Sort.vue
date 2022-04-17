<template>
  <div class="sort">
    <v-btn elevation="0" color="primary" fab small @click="openSort">
      <v-icon>mdi-sort</v-icon>
    </v-btn>
    <v-dialog v-model="isSortOpened" max-width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Сортировка </v-card-title>

        <v-radio-group v-model="pickedSort" class="pl-4">
          <v-radio
            v-for="sort in sorts"
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
  data() {
    return {
      isSortOpened: false,
      sorts: [
        {
          id: 1,
          name: "По дате создания(сначала новые)",
        },
        {
          id: 2,
          name: "По дате создания(сначала старые)",
        },
        {
          id: 3,
          name: "По дате изменения(сначала новые)",
        },
        {
          id: 4,
          name: "По дате изменения(сначала старые)",
        },
      ],
      pickedSort: null,
    };
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