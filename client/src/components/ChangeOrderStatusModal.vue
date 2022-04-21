<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение статуса заказа
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="status"
          :items="avaliableStatuses"
          item-text="text"
          item-value="key"
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="updateOrderStatus">Изменить</v-btn>
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
    order: {
      type: Object | null,
      required: true,
    },
  },
  data() {
    return {
      status: "",
      statuses: [
        {
          key: "created",
          text: "Создан",
        },
        {
          key: "process",
          text: "В процессе",
        },
        {
          key: "done",
          text: "Завершен",
        },
        {
          key: "canceled",
          text: "Отменен",
        },
      ],
    };
  },

  computed: {
    avaliableStatuses() {
      if (this.order?.status === "created") {
        return this.statuses;
      } else {
        return this.statuses.slice(1);
      }
    },
  },

  methods: {
    async updateOrderStatus() {
      this.$emit("close", this.status);
    },
  },

  watch: {
    isOpened(value) {
      if (value) this.status = this.order.status;
    },
  },
};
</script>

<style scoped lang="scss">
</style> 