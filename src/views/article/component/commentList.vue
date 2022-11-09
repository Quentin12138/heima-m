<template>
  <div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        ><comment-item
          v-for="item in commentlist"
          :key="item.com_id"
          :comItem="item"
          @openReplyCom="openReplyCom"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import { getCommentListApi } from "@/api/comment";
export default {
  props: {
    type: String,
    articleIdComment: {
      type: [Number, String],
    },
    newCommentObj: Object,
  },
  components: {
    commentItem,
  },
  data() {
    return {
      commentlist: [],
      loading: false,
      finished: false,
      offset: "",
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        let obj = {
          type: this.type,
          source: this.articleIdComment,
          limit: 10,
          offset: this.offset,
        };
        let { data } = await getCommentListApi(obj);
        if (data.data.results.length === 0) {
          this.finished = true;
        } else {
          this.commentlist = [...this.commentlist, ...data.data.results];
          this.offset = data.data.last_id;
          this.loading = false;
          this.$emit("totalCountFn", data.data.total_count);
        }
      } catch (err) {
        console.log(err);
      }
    },
    openReplyCom(item) {
      this.$emit("openReplyCom", item);
    },
  },
  watch: {
    newCommentObj: {
      handler(newVal) {
        let bool = this.commentlist.find((item) => {
          return item.com_id === newVal.com_id;
        });
        if (!bool) {
          this.commentlist.unshift(newVal);
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
