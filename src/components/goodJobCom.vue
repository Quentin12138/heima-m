<template>
  <div>
    <van-button
      type="primary"
      :icon="attitude === 1 ? 'good-job' : 'good-job-o'"
      class="starbtn"
      :loading="goodjobLoading"
      @click="goodgobFn"
    />
  </div>
</template>

<script>
import { goodjobGoApi, goodjobOutApi } from "@/api/article";
export default {
  props: {
    artid: {
      type: [String, Number],
    },
    attitude: {
      type: Number,
    },
  },
  data() {
    return {
      goodjobLoading: false,
    };
  },
  methods: {
    async goodgobFn() {
      let target = this.artid;
      this.goodjobLoading = true;
      try {
        if (this.attitude == 1) {
          await goodjobOutApi(target);
          this.$emit("isGoodJobFn", 0);
        } else {
          await goodjobGoApi({ target });
          this.$emit("isGoodJobFn", 1);
        }
        this.goodjobLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
