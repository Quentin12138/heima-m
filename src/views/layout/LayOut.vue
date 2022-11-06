<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item class="tabitem" to="/home">
        <span>首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="tabitem" to="/qa">
        <span>问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="tabitem" to="/video">
        <span>视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="tabitem" to="/my">
        <span>{{ $store.state.token ? "我的" : "未登录" }}</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item replace to="/qa" icon="search">
      
      </van-tabbar-item> -->
      <!-- <van-tabbar-item replace to="/video" icon="search">视频</van-tabbar-item> -->
      <!-- <van-tabbar-item replace to="/my" icon="search">未登录</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="less">
.tabitem {
  .toutiao {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>
