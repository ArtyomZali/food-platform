<template>
  <div :class="`asset asset--${size}`" @click="showAsset">
    <div
      class="video-placeholder"
      v-if="asset && asset.link.includes('.mp4')"
    ></div>
    <v-img v-else :src="assetSrc" class="image-placeholder"></v-img>
    <v-icon class="delete-btn" @click.stop="deleteAsset" v-if="mutable"
      >mdi-close</v-icon
    >
  </div>
</template>

<script>
export default {
  props: {
    mutable: {
      type: Boolean,
      default: false,
    },
    asset: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteAsset() {
      this.$emit("delete");
    },
    showAsset() {
      this.$emit("show");
    },
  },
  computed: {
    assetSrc() {
      return `${this.$api.BASE_URL}${this.asset.link}`;
    },
  },
};
</script>

<style>
.asset {
  margin-right: 16px;
  position: relative;
  cursor: pointer;
}
.asset--sm {
  width: 120px;
  height: 120px;
}

.asset--lg {
  width: 240px;
  height: 240px;
}

.video-placeholder {
  height: 100%;
  width: 100%;
  background: url("~@/assets/video-placeholder.jpg") no-repeat center / cover;
}

.image-placeholder {
  height: 100%;
}

.v-icon.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>