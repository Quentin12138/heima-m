<template>
  <div class="article-container">
    <div>
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="黑马头条"
      ></van-nav-bar>
      <!-- /导航栏 -->

      <div class="main-wrap">
        <!-- 加载中 -->
        <div class="loading-wrap" v-if="loadingShow">
          <van-loading color="#3296fa" vertical> 加载中</van-loading>
        </div>
        <!-- /加载中 -->

        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="articleContent.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ articleContent.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="articleContent.aut_photo"
            />
            <div slot="title" class="user-name">
              {{ articleContent.aut_name }}
            </div>
            <div slot="label" class="publish-date">
              {{ articleContent.pubdate }}
            </div>
            <follow-com
              :autid="articleContent.aut_id"
              :isFollowed="articleContent.is_followed"
              @isFollowFn="isFollowFn"
            ></follow-com>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="articleContent.content"
            ref="articleContent"
          ></div>
          <van-divider>正文结束</van-divider>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="statusShow == 404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

        <comment-list
          :articleIdComment="articleId"
          type="a"
          @totalCountFn="totalCountFn"
          @openReplyCom="openReplyCom"
        ></comment-list>
      </div>

      <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="addComment"
          >写评论</van-button
        >
        <van-icon name="comment-o" :badge="totalCountNum" color="#777" />
        <collected-com
          :artid="articleContent.art_id"
          :isCollected="articleContent.is_collected"
          @iscollectedFn="iscollectedFn"
        />
        <!-- <van-icon
        color="#ff9912"
        name="star"
        @click="collectonFn"
        v-if="this.articleContent.is_collected"
      />
      <van-icon color="#777" name="star-o" @click="collectonFn" v-else /> -->
        <good-job-com
          :artid="articleContent.art_id"
          :attitude="articleContent.attitude"
          @isGoodJobFn="isGoodJobFn"
        />
        <van-icon name="share" color="#777777"></van-icon>
        <van-popup v-model="addCommentShow" position="bottom">
          <comment-post
            :artid="articleContent.art_id"
            @closepopup="addCommentShow = false"
        /></van-popup>
      </div>
      <van-popup v-model="replyComShow" position="bottom" style="height: 100%">
        <comment-reply :comTwoItem="comOneItem"></comment-reply>
      </van-popup>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { articleApi } from "@/api/article";
import { ImagePreview } from "vant";
import followCom from "@/components/followCom.vue";
import collectedCom from "@/components/collectedCom.vue";
import goodJobCom from "@/components/goodJobCom.vue";
import commentList from "./component/commentList.vue";
import commentPost from "./component/commentPost";
import commentReply from "./component/commentReply.vue";
export default {
  name: "ArticleIndex",
  components: {
    followCom,
    collectedCom,
    goodJobCom,
    commentList,
    commentPost,
    commentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      loadingShow: false, //加载中
      statusShow: 0,
      articleContent: {},
      totalCountNum: "",
      addCommentShow: false,
      replyComShow: false,
      comOneItem: {},
    };
  },
  created() {
    this.addarticle();
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    async addarticle() {
      try {
        this.loadingShow = true;
        let { data } = await articleApi(this.articleId);
        this.articleContent = data.data;
        this.$nextTick(() => {
          let divDom = this.$refs.articleContent;
          let imgList = divDom.querySelectorAll("img");
          let arr = [];
          imgList.forEach((item) => {
            arr.push(item.src);
            item.onclick = () => {
              ImagePreview(arr);
            };
          });
        });
        this.loadingShow = false;
        console.log(data);
      } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
          this.statusShow = 404;
        }
      }
    },
    isFollowFn(boolean) {
      this.articleContent.is_followed = boolean;
    },
    iscollectedFn(bool) {
      this.articleContent.is_collected = bool;
    },
    isGoodJobFn(val) {
      this.articleContent.attitude = val;
    },
    totalCountFn(val) {
      this.totalCountNum = val;
    },
    addComment() {
      console.log(12);
      this.addCommentShow = true;
    },
    openReplyCom(item) {
      this.replyComShow = true;
      this.comOneItem = item;
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
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
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /deep/ .starbtn {
    background-color: #fff;
    border: 0px;
    color: #3a3a3a;
    .van-icon-star-o {
      color: #3a3a3a;
    }
    .van-icon-star {
      color: #ff9912;
    }
  }
}
</style>
