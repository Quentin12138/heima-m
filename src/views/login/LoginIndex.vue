<template>
  <div>
    <van-nav-bar
      class="page-nav-bar"
      title="登录页面"
      @click-left="onClickLeft"
    >
      <template #left>
        <i class="toutiao toutiao-guanbi"></i>
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        :rules="userValidatorPhone"
        name="手机号"
        placeholder="请输入手机号"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="userValidatorCode"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button class="send-sms-btn" round size="mini" type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
    <!-- <ComOne />
    <ComTwo /> -->
    <!-- <button @click="$store.commit('setData', 456)">点击</button> -->
  </div>
</template>
<script>
// import ComOne from "../ComOne.vue";
// import ComTwo from "../ComTwo.vue";
import { loginapi } from "@/api/user";
export default {
  // components: {
  //   ComOne,
  //   ComTwo,
  // },
  data() {
    return {
      user: {
        mobile: "15589402921",
        code: "246810",
      },
      userValidatorPhone: [
        { required: true, message: "请填写手机号" },
        { pattern: /^1[3|5|7|8]\d{9}$/, message: "请输入正确的手机号" },
      ],
      userValidatorCode: [
        { required: true, message: "请填写验证码" },
        { pattern: /^\d{6}$/, message: "请输入正确的验证码" },
      ],
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      try {
        let res = await loginapi(this.user);
        console.log(res.data.data.token);
        this.$store.commit("setToken", res.data.data);
        this.$toast.success("登录成功！");
        //登录成功之后也要返回到上一级页面
        this.$router.back();
      } catch (error) {
        if (error.response.status == 400) {
          this.$toast.fail(error.response.data.message);
          // alert(error.response.data.message);
        }
        console.log(error);
      }
    },
    onClickLeft() {
      console.log(123);
      //返回上一层路由页面
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
