<template>
  <div class="edit">
    <div class="nav_bar">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="个人信息"
        @click-left="$router.push({ path: './my' })"
      ></van-nav-bar>
      <!-- 导航栏 -->
    </div>
    <div>
      <van-cell center title="头像" is-link value="内容">
        <template
          ><van-image round class="userphoto" :src="userinfo.photo"
        /></template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="userinfo.name"
        @click="editNameShow"
      />
      <van-cell
        title="性别"
        is-link
        :value="userinfo.gender === 1 ? '女' : '男'"
        @click="genderShow = true"
      >
        <!-- <van-popup v-model="genderPopupShow">内容</van-popup> -->
      </van-cell>
      <van-cell title="生日" is-link :value="userinfo.birthday" />
    </div>
    <!-- 修改name弹层 -->
    <van-popup v-model="nameShow" position="bottom" style="height: 100%"
      ><van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="nameShow = false"
        @click-right="addName"
      />
      <div class="popName">
        <van-field
          v-model.trim="nameMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请设置昵称"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- 修改gender弹层 -->
    <van-popup v-model="genderShow" position="bottom"
      ><van-picker
        title="选择性别"
        show-toolbar
        :columns="gender"
        @confirm="addGender"
        @cancel="genderShow = false"
      />
      <div class="popGender"></div>
    </van-popup>
  </div>
</template>

<script>
import { getuserinfo, setuserinfo } from "@/api/user";
export default {
  data() {
    return {
      userinfo: "",
      nameShow: false,
      genderShow: false,
      nameMessage: "",
      gender: ["男", "女"],
    };
  },
  async created() {
    try {
      let { data } = await getuserinfo();
      console.log(data);
      this.userinfo = data.data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // 点击打开编辑弹层方法
    editNameShow() {
      this.nameShow = true;
      this.nameMessage = this.userinfo.name;
    },
    // 编辑name弹层
    async addName() {
      try {
        if (this.nameMessage.length === 0) {
          return;
        }
        this.$toast.loading({ message: "更新中..." });
        let obj = {
          name: this.nameMessage,
        };
        await setuserinfo(obj);
        this.$toast.success("修改成功");
        this.userinfo.name = this.nameMessage;
        this.nameShow = false;
      } catch (err) {
        console.log(err);
        this.$toast.fail("修改失败,请重试...");
      }
    },
    async addGender(value, index) {
      console.log(value, index);
      try {
        this.$toast.loading({ message: "更新中..." });
        let obj = {
          gender: index,
        };
        await setuserinfo(obj);
        this.$toast.success("修改成功");
        this.userinfo.gender = index;
        this.genderShow = false;
      } catch (err) {
        console.log(err);
        this.$toast.fail("修改失败,请重试...");
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="less">
.edit {
  .userphoto {
    width: 60px;
    height: 60px;
  }
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
}
</style>
