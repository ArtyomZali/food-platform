<template>
  <v-overlay :value="isOpened" @click="$emit('close')">
    <div class="asset-cover" @click.stop>
      <video-player
        v-if="isVideo"
        :options="playerOptions"
        class="video"
      ></video-player>
      <v-img :src="assetSrc" class="image"></v-img>
    </div>
  </v-overlay>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "@/assets/custom.css";
export default {
  components: {
    videoPlayer,
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    asset: {
      type: Object | null,
      required: true,
    },
  },
  computed: {
    assetSrc() {
      return `${this.$api.BASE_URL}${this.asset?.link}`;
    },
    playerOptions() {
      return {
        muted: false,
        language: "ru",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        height: "300",
        sources: [
          {
            type: "video/mp4",
            src: this.assetSrc,
          },
        ],
      };
    },
    isVideo() {
      return this.asset?.link.includes(".mp4");
    },
  },
};
</script>

<style scoped>
.asset-cover {
  height: 300px;
  width: 300px;
  background: #fff;
}
.image {
  height: 300px;
  width: 300px;
}
</style>