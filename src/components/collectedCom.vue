<template>
  <div>
    <van-button
      type="primary"
      :icon="isCollected ? 'star' : 'star-o'"
      class="starbtn"
      :loading="collectedLoading"
      @click="collectonFn"
    />
  </div>
</template>

<script>
import { collectionGoApi, collectionOutApi } from "@/api/article";
export default {
  props: {
    artid: {
      type: [String, Number],
    },
    isCollected: {
      type: Boolean,
    },
  },
  components: {},
  data() {
    return {
      collectedLoading: false,
    };
  },
  methods: {
    async collectonFn() {
      let target = this.artid;
      this.collectedLoading = true;
      try {
        if (this.isCollected) {
          await collectionOutApi(target);
          this.$toast("已取消收藏");
        } else {
          await collectionGoApi({ target });
          this.$toast.success("收藏成功！");
        }
        this.$emit("iscollectedFn", !this.isCollected);
        this.collectedLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
