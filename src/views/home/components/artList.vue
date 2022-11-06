<template>
  <div>
    <div class="artlistcon">
      <van-pull-refresh
        v-model="isLoading"
        :success-text="successText"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            v-for="item in artList"
            :key="item.art_id"
            :title="item.title"
          /> -->
          <artItem
            v-for="(item, index) in artList"
            :artitem="item"
            :key="item.art_id + index"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import artItem from "@/components/artItem";
import { userArtListApi } from "@/api/home";
export default {
  props: {
    channelsItem: {
      type: Object,
    },
  },
  components: {
    artItem,
  },
  data() {
    return {
      artList: [], //文章列表
      timestamp: new Date().valueOf(),
      loading: false,
      finished: false,
      isLoading: false,
      successText: "",
    };
  },
  created() {},
  methods: {
    async getArtList() {
      try {
        let obj = {
          channel_id: this.channelsItem.id,
          timestamp: this.timestamp,
        };
        let { data } = await userArtListApi(obj);
        if (data.data.results.length == 0 || data.data.pre_timestamp == null) {
          //当没有数据了，数据已全部加载完毕，则直接将 finished 设置成 true 即可。
          this.finished = true;
        } else {
          this.artList = [...this.artList, ...data.data.results];
          //请求下一段数据,需要上一次网络请求里pre_timestamp的值
          this.timestamp = data.data.pre_timestamp;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.getArtList();
    },
    async onRefresh() {
      try {
        let obj = {
          channel_id: this.channelsItem.id,
          timestamp: new Date().valueOf(),
        };
        let { data } = await userArtListApi(obj);
        this.successText = `刷新成功，刷新了${data.data.results.length}条数据`;
        this.artList.unshift(...data.data.results);
        this.isLoading = false;
      } catch (error) {
        this.successText = "刷新失败";
        console.log(error);
      }
    },
  },
};
</script>
<style scoped lang="less">
.artlistcon {
  position: fixed;
  top: 186px;
  left: 0px;
  right: 0px;
  bottom: 104px;
  overflow-y: auto;
}
</style>
