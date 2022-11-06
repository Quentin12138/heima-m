<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="!isFollowed"
      @click="followedFn"
      :loading="following"
      loading-text="正在关注"
      >关注</van-button
    >
    <van-button
      class="follow-btn"
      round
      size="small"
      v-else
      @click="followedFn"
      :loading="following"
      loading-text="正在取关"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { followGoApi, followOutApi } from "@/api/article";
export default {
  props: {
    autid: {
      type: [String, Number],
    },
    isFollowed: Boolean,
  },
  data() {
    return {
      following: false,
    };
  },
  methods: {
    async followedFn() {
      let target = this.autid;
      this.following = true;
      // 当判断条件为true时，应该是取消关注
      // 当判断条件为false时，应该是关注作者
      try {
        if (this.isFollowed) {
          await followOutApi(target);
        } else {
          await followGoApi({ target });
        }
        this.$emit("isFollowFn", !this.isFollowed);
        this.following = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.follow-btn {
  width: 180px;
}
</style>
