<template>
  <div>
    <div class="close" @click="$emit('close')">
      <i class="toutiao toutiao-guanbi"></i>
    </div>
    <!-- 我的频道 -->
    <div class="mycha">
      <div>我的频道</div>
      <van-button
        type="danger"
        plain
        round
        class="edibtn"
        @click="editactive = !editactive"
      >
        {{ editactive ? "完成" : "编辑" }}
      </van-button>
    </div>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ red: channleActive == index }"
        v-for="(item, index) in mychannels"
        :key="item.id"
        :text="item.name"
        @click="gridItemClick(index)"
      >
        <template #icon v-if="editactive && item.id != 0">
          <van-icon name="clear" class="clearbtn"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="mycha mt75">
      <div>推荐频道</div>
    </div>
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="item in recommendChannels"
        :key="item.id"
        icon="plus"
        :text="item.name"
        @click="addchnnels(item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { allChannesListApi, setUserChannesListApi } from "@/api/home";
import "@/utils/storage";
import { setItem } from "@/utils/storage";
export default {
  props: {
    mychannels: {
      type: Array,
    },
    channleActive: {
      type: Number,
    },
  },
  async created() {
    try {
      let { data } = await allChannesListApi();
      console.log(data.data.channels);
      this.allChannels = data.data.channels;
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      editactive: false,
      allChannels: [],
    };
  },
  methods: {
    gridItemClick(index) {
      if (this.editactive) {
        // 当前为编辑状态
        // 不能删除推荐频道
        if (this.mychannels[index].id == 0) {
          return;
        }
        this.mychannels.splice(index, 1);
        if (index < this.channleActive) {
          this.$emit("updataActive", 1);
        }
      } else {
        // 当前状态为非编辑状态，关闭弹层，并跳转到对应的频道项
        this.$emit("updataShow", false, index);
      }
    },
    addchnnels(item) {
      this.mychannels.push(item);
    },
  },
  computed: {
    recommendChannels() {
      // 将处理好的数据给计算属性 recommendChannels 进行一个返回
      return this.allChannels.filter((item) => {
        // 返回符合条件的元素
        return !this.mychannels.find((it) => {
          // 返回符合条件的元素
          return it.id == item.id;
        });
      });
    },
  },
  watch: {
    mychannels: {
      deep: true,
      handler(newVal) {
        let arr = [];
        if (this.$store.state.token) {
          // 已登陆，走接口
          for (let i = 0; i < newVal.length; i++) {
            let obj = {};
            obj.id = newVal[i].id;
            obj.seq = i;
            arr.push(obj);
          }
          try {
            setUserChannesListApi(arr);
          } catch (error) {
            console.log(error);
          }
        } else {
          // 未登录，走缓存
          setItem("CHANNELS", newVal);
        }
      },
    },
  },
};
</script>
<style scoped lang="less">
.close {
  margin: 30px 0px 0px 30px;
  .toutiao {
    font-size: 28px;
    line-height: 28px;
    display: block;
  }
}
.mycha {
  height: 48px;
  margin-top: 40px;
  padding: 0px 24px;
  margin-bottom: 46px;
  div:first-child {
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 2px;
    color: #333;
    float: left;
  }
  .edibtn {
    height: 48px;
    width: 120px;
    float: right;
    /deep/.van-button__text {
      font-size: 25px;
      color: red;
    }
  }
}
.mt75 {
  margin-top: 75px;
}
.grid-item {
  width: 160px;
  height: 86px;
  /deep/.van-grid-item__content {
    background-color: #f4f5f6;
    .van-grid-item__text {
      font-size: 28px;
      color: #222;
      margin-left: 6px;
    }
    .van-icon {
      font-size: 24px;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
      .clearbtn {
        position: absolute;
        top: -12px;
        right: -12px;
        z-index: 9;
        color: #cacaca;
      }
    }
  }
}
/deep/.red {
  .van-grid-item__content {
    .van-grid-item__text {
      color: red;
    }
  }
}
</style>
