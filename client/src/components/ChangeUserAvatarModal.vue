<template>
  <v-dialog v-model="isOpened" @click:outside="$emit('close')">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Нажмите на аватар, чтобы сменить его
      </v-card-title>

      <div class="file-input">
        <input @change="showAvatar" type="file" name="file" />
        <v-img class="avatar" :src="avatarSrc"></v-img>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="uploadAvatar"> Изменить </v-btn>
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
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      newAvatarSrc: null,
      newAvatar: null,
    };
  },

  methods: {
    showAvatar(e) {
      const file = e.target.files[0];
      this.newAvatarSrc = URL.createObjectURL(file);
      this.newAvatar = file;
    },
    uploadAvatar() {
      this.$callWithErrorHandler(() => {
        this.$api.updateUserAvatar({ avatar: this.newAvatar });
        this.isOpened = false;
      });
    },
  },

  computed: {
    avatarSrc() {
      return this.newAvatarSrc
        ? this.newAvatarSrc
        : this.user.avatar
        ? `${this.$api.BASE_URL}${this.user.avatar}`
        : require("@/assets/avatar.png");
    },
  },
};
</script>

<style scoped>
.file-input {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 32px auto 32px auto;
}
.avatar {
  width: 200px;
  height: 200px;
}
input {
  display: block;
  position: absolute;
  height: 100%;
  z-index: 100;
  opacity: 0;
  cursor: pointer;
}
</style>