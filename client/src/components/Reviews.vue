<template>
  <div>
    <h4>Средняя оценка: {{ averageReview.toFixed(1) }}</h4>
    <v-rating
      half-increments
      readonly
      length="5"
      size="32"
      :value="averageReview"
    ></v-rating>
    <v-btn v-if="mutable" color="primary" @click="openCreateReviewModal"
      >Добавить оценку</v-btn
    >
    <review
      v-for="review in reviews"
      :key="`review-${review.id}`"
      :review="review"
    />
    <create-review-modal
      :isOpened="isCreateReviewModalOpened"
      :shopItem="shopItem"
      @close="closeCreateReviewModal"
    />
  </div>
</template>

<script>
import Review from "./Review.vue";
import CreateReviewModal from "./CreateReviewModal.vue";
export default {
  components: {
    Review,
    CreateReviewModal,
  },
  props: {
    shopItem: {
      type: Object,
      required: true,
    },
    mutable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      isCreateReviewModalOpened: false,
    };
  },
  computed: {
    averageReview() {
      return this.reviews.reduce((a, b) => {
        return a + b.grade / this.reviews.length;
      }, 0);
    },
  },
  methods: {
    async getReviews() {
      await this.$callWithErrorHandler(async () => {
        this.reviews = (
          await this.$api.getReviewsByShopItemId(this.shopItem.id)
        ).data;
      });
    },
    openCreateReviewModal() {
      this.isCreateReviewModalOpened = true;
    },
    closeCreateReviewModal(value) {
      this.isCreateReviewModalOpened = false;
      if (value) {
        this.getReviews();
      }
    },
  },
  watch: {
    shopItem() {
      this.getReviews();
    },
  },
  beforeMount() {
    this.getReviews();
  },
};
</script>

<style>
</style>