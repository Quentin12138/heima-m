<template>
  <div>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ comItem.aut_name }}</div>
        <van-button
          class="like-btn"
          :class="{ liking: comItem.is_liking }"
          @click="likeFn"
          :icon="comItem.is_liking ? 'good-job' : 'good-job-o'"
          >{{ comItem.like_count || "赞" }}</van-button
        >
      </div>

      <div slot="label">
        <p class="comment-content">{{ comItem.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{
            comItem.pubdate | relativeTime
          }}</span>
          <van-button class="reply-btn" round @click="replyComFn"
            >回复 {{ comItem.reply_count }}</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { likeGoApi, likeOutApi } from "@/api/comment";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comItem: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async likeFn() {
      try {
        if (this.comItem.is_liking) {
          // 为true时应该取消点赞
          let res = await likeOutApi(this.comItem.com_id);
          console.log(res);
          this.comItem.like_count--;
        } else {
          // 为false时应该点赞
          let res = await likeGoApi({ target: this.comItem.com_id });
          console.log(res);
          this.comItem.like_count++;
        }
        this.comItem.is_liking = !this.comItem.is_liking;
      } catch (err) {
        console.log(err);
      }
    },
    // 打开评论回复弹层
    replyComFn() {
      this.$emit("openReplyCom", this.comItem);
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liking {
    color: aqua;
  }
}
</style>
