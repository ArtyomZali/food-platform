<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{title}}
      </v-card-title>

      <v-card-text>
        {{text}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="$emit('confirm')"
        >
          {{buttonLabel}}
        </v-btn>
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
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    buttonLabel: {
        type: String,
        required: true
    }
  },
};
</script>

<style scoped>
</style>