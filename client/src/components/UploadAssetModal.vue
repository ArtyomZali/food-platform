<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')" max-width="600">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ title }}
      </v-card-title>

      <div class="file-input">
        <video-player
          class="video-player"
          v-if="isAssetVideo"
          :options="playerOptions"
          :playsinline="true"
        ></video-player>
        <v-img class="asset-placeholder" :src="assetSrc" v-else></v-img>
        <v-file-input
          placeholder="Выберите файл"
          @change="showAsset"
        ></v-file-input>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="uploadAsset">
          {{ buttonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadAssetModal from "./UploadAssetModal.vue";

import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "@/assets/custom.css";

export default {
  components: {
    UploadAssetModal,
    videoPlayer,
  },
  props: {
    isOpened: {
      type: Boolean,
      requird: true,
    },
    previousAssetUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      requird: true,
    },
    isVideoAllowed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newAsset: null,
      newAssetUrl: null,
    };
  },
  methods: {
    uploadAsset() {
      this.$emit("close", this.newAsset);
    },
    showAsset(file) {
      7;
      if (file) {
        if (this.checkFileType(file.type)) {
          this.newAssetUrl = URL.createObjectURL(file);
          this.newAsset = file;
        } else {
          this.$store.dispatch("triggerError", "Некорректный формат файла");
        }
      } else {
        this.newAssetUrl = null;
        this.newAsset = null;
      }
    },
    checkFileType(type) {
      if (this.isVideoAllowed) {
        return ["video/mp4", "image/jpeg", "image/png"].includes(type);
      } else {
        return ["image/jpeg", "image/png"].includes(type);
      }
    },
  },
  computed: {
    assetSrc() {
      return this.newAssetUrl
        ? this.newAssetUrl
        : this.previousAssetUrl
        ? `${this.$api.BASE_URL}${this.previousAssetUrl}`
        : require("@/assets/default.png");
    },
    isAssetVideo() {
      return this.newAsset?.type === "video/mp4";
    },
    playerOptions() {
      return {
        muted: false,
        language: "ru",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        height: "200",
        sources: [
          {
            type: "video/mp4",
            src: this.newAssetUrl,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.file-input {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin: 32px auto 32px auto;
}
.asset-placeholder {
  width: 200px;
  height: 200px;
}
.v-input {
  width: 60%;
}
</style>
