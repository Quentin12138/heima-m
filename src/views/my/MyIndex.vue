<template>
  <div>
    <div class="header">
      <!-- 已登录的dom结构 -->
      <div class="loginin" v-if="$store.state.token">
        <!-- 用户头像 -->
        <div class="logintop">
          <van-image class="img" round :src="user.photo" />
          <div class="loginname">{{ user.name }}</div>
          <van-button class="loginbtn" size="mini" type="primary" to="useredit"
            >编辑资料</van-button
          >
        </div>
        <!-- 数据统计 -->
        <div class="datalist">
          <div class="item">
            <div>{{ user.art_count }}</div>
            <div>头条</div>
          </div>
          <div class="item">
            <div>{{ user.follow_count }}</div>
            <div>关注</div>
          </div>
          <div class="item">
            <div>{{ user.fans_count }}</div>
            <div>粉丝</div>
          </div>
          <div class="item">
            <div>{{ user.like_count }}</div>
            <div>获赞</div>
          </div>
        </div>
      </div>
      <!-- 未登录的dom结构 -->
      <div class="outlogin" v-else @click="loginin">
        <img src="@/assets/mobile.png" alt="" />
        <div class="text">登录/注册</div>
      </div>
    </div>
    <!--收藏和历史 -->
    <van-grid column-num="2">
      <van-grid-item class="columnitem" icon="photo-o" text="文字">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="columnitem" icon="photo-o" text="文字">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="cel">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <div class="loginout" v-if="$store.state.token" @click="loginout">
      退出登录
    </div>
  </div>
</template>
<script>
import { removeStor } from "@/utils/storage";
import { userinfo } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      loginstate: false,
      user: "", //存储用户信息
    };
  },
  async created() {
    try {
      //对象的解构
      let { data } = await userinfo();
      this.user = data.data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    loginin() {
      this.$router.push("/login");
    },
    loginout() {
      //使用Dialog的全局方法：this.$dialog
      this.$dialog
        .confirm({
          //弹窗的标题
          title: "确认退出吗？",
        })
        .then(() => {
          //点击确认触发的回调函数
          console.log("123");
          removeStor();
        })
        .catch(() => {
          //点击取消触发的回调函数
          console.log("456");
        });
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 366px;
  width: 100%;
  background: url("@/assets/banner.png");
  .outlogin {
    text-align: center;
    img {
      width: 132px;
      height: 132px;
      margin: 113px 0px 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .loginin {
    overflow: hidden;
    line-height: 132px;
    .logintop {
      margin-top: 80px;
      padding: 0px 32px;
      overflow: hidden;
      .img {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        float: left;
      }
      .loginname {
        font-size: 30px;
        color: #fff;
        float: left;
        margin-left: 22px;
      }
      .loginbtn {
        width: 116px;
        height: 33px;
        background-color: #ffffff;
        border-radius: 16px;
        color: #666666;
        font-size: 20px;
        float: right;
        margin-top: 50px;
      }
    }

    .datalist {
      padding: 0px 32px;
      .item {
        width: 25%;
        float: left;
        color: #fff;
        text-align: center;
        div:first-child {
          font-size: 36px;
          line-height: 36px;
          margin: 55px 0px 18px;
        }
        div:last-child {
          font-size: 23px;
          line-height: 24px;
        }
      }
    }
  }
}
.columnitem {
  .toutiao {
    font-size: 45px;
  }
  .text {
    font-size: 28px;
    color: #333333;
    margin-top: 16px;
  }
}
.cel {
  margin: 9px 0px;
}
.loginout {
  height: 105px;
  font-size: 30px;
  letter-spacing: 2px;
  color: #d86262;
  text-align: center;
  background: #fff;
  line-height: 105px;
}
</style>
