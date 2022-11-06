<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <comment-item :comItem="comTwoItem"></comment-item>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
export default {
  props: {
    comTwoItem: {
      type: Object,
    },
  },
  components: {
    commentItem,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
