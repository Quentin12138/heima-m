<template>
  <div>
    <!-- 1、搜索按钮 -->
    <van-nav-bar class="page-nav-bar" title="搜索">
      <template #title>
        <van-button class="seachbtn" type="info" to="search">
          <template #icon>
            <i class="toutiao toutiao-sousuo"></i>
          </template>
          <template #default> 搜索 </template>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 2、频道列表 -->
    <van-tabs v-model="active" class="channels">
      <van-tab
        :title="item.name"
        v-for="item in userChannesList"
        :key="item.id"
      >
        <artList :channelsItem="item" />
      </van-tab>
      <div class="hamburgerbtn" @click="hamburgerbtn()">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <channelEdit
        @close="show = false"
        :mychannels="userChannesList"
        :channleActive="active"
        @updataShow="updataShow"
        @updataActive="updataActive"
      />
    </van-popup>
    <!-- 3、文章列表 -->
  </div>
</template>
<script>
import artList from "./components/artList";
import channelEdit from "./components/channelEdit.vue";
import { userChannesListApi } from "@/api/home";
import { getItem } from "@/utils/storage";
export default {
  components: {
    artList,
    channelEdit,
  },
  data() {
    return {
      active: 0, //频道的高亮效果索引值
      userChannesList: [], //用户的频道
      show: false, //调试频道组件，暂时使用true开启，再改成false即可
    };
  },
  async created() {
    try {
      if (this.$store.state.token) {
        let { data } = await userChannesListApi();
        this.userChannesList = data.data.channels;
      } else {
        let storageCannels = getItem("CHANNELS");
        if (storageCannels) {
          this.userChannesList = storageCannels;
        } else {
          let { data } = await userChannesListApi();
          this.userChannesList = data.data.channels;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    hamburgerbtn() {
      this.show = true;
    },
    updataShow(blo, ind) {
      this.show = blo;
      this.active = ind;
    },
    updataActive(num) {
      this.active -= num;
    },
  },
};
</script>
<style scoped lang="less">
.seachbtn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border-radius: 32px;
  .toutiao {
    font-size: 32px;
  }
}
.page-nav-bar {
  // 深度选择符
  //当你使用了第三方组件，修改样式改不了，就需要用到/deep/深度选择符
  /deep/ .van-button__text {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
}
.channels {
  padding-right: 66px;
  /deep/ .van-tab {
    min-width: 190px;
    border-right: 2px solid #edeff3;
  }
  /deep/ .van-tab__text {
    font-size: 30px;
  }
  /deep/ .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    border-radius: 3px;
  }
}
.hamburgerbtn {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 66px;
  height: 82px;
  line-height: 80px;
  text-align: center;
  background: #ffffff;
  opacity: 0.5;
  .toutiao {
    font-size: 40px;
  }
}
</style>
