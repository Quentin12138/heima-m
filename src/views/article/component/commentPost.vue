<template>
  <div>
    <div class="comment-post">
      <van-field
        class="postcomment"
        v-model="commentMessage"
        row="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button class="postbtn" @click="postcomment">发布</van-button>
    </div>
  </div>
</template>

<script>
import { commentPostApi } from "@/api/comment";
export default {
  props: {
    artid: [Number, String],
  },
  data() {
    return {
      commentMessage: "",
    };
  },
  methods: {
    // 发布评论
    async postcomment() {
      if (this.commentMessage.trim() === "") {
        this.$toast("请填写内容！");
        return;
      }
      try {
        let obj = {
          target: this.artid,
          content: this.commentMessage,
          art_id: this.$store.state.articleId,
        };
        let { data } = await commentPostApi(obj);
        console.log(data.data.new_obj);
        this.commentMessage = "";
        // this.$store.commit("setcomment", data.data.new_obj);
        this.$emit("setRecommentObj", data.data.new_obj);
        this.$emit("closepopup");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .postcomment {
    background-color: #f5f7f9;
  }
  .postbtn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
