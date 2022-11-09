<template>
  <div>
    <van-nav-bar
      :title="
        comTwoItem.reply_count > 0
          ? `${comTwoItem.reply_count}条回复`
          : '暂无评论'
      "
      left-arrow
      @click-left="$emit('closepopup')"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 单个评论项 -->
    <comment-item :comItem="comTwoItem" />
    <!-- 回复评论列表 -->
    <van-cell title="全部回复" />
    <comment-list
      type="c"
      :articleIdComment="comTwoItem.com_id"
      :newCommentObj="newCommentObj"
    />
    <!-- 底部区域 -->
    <div class="reply-bootom">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="addComment"
        >写评论</van-button
      >
    </div>
    <!-- 评论的回复 -->
    <van-popup v-model="addCommentShow" position="bottom">
      <comment-post
        :artid="comTwoItem.com_id"
        @closepopup="addCommentShow = false"
        @setRecommentObj="newCommentObj = $event"
    /></van-popup>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import commentList from "./commentList.vue";
import commentPost from "./commentPost.vue";
export default {
  props: {
    comTwoItem: {
      type: Object,
    },
  },
  components: {
    commentItem,
    commentList,
    commentPost,
  },
  data() {
    return {
      addCommentShow: false,
      newCommentObj: {},
    };
  },
  methods: {
    addComment() {
      this.addCommentShow = true;
      this.comTwoItem.reply_count++;
    },
  },
};
</script>

<style lang="less" scoped>
.reply-bootom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
}
</style>
