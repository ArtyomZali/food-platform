<template>
  <v-overlay :value="isOpened" @click="$emit('close')">
    <div class="asset-cover" @click.stop>
      <yandex-map v-if="address" :coords="address" :zoom="10">
        <ymap-marker :coords="address" marker-id="123" />
      </yandex-map>
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: {
    address: {
      type: Array | null,
      required: true,
    },
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 400px;
  width: 600px;
  margin-bottom: 24px;
}

@media (max-width: 800px) {
  .ymap-container {
    height: 200px;
    width: 300px;
  }
}
</style>