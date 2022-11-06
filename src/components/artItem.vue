<template>
  <div>
    <!-- 1、无封面 -->
    <div class="itemone" @click="artview">
      <div class="itemthree">
        <!-- 单图的时候标题宽度为447 -->
        <div class="title" :class="{ wd447: artitem.cover.type == 1 }">
          {{ artitem.title }}
        </div>
        <div class="imglist imgone" v-if="artitem.cover.type == 1">
          <!-- 单图的时候，images只有一张图片，就地取0即可，无需v-for -->
          <van-image
            width="100%"
            height="100%"
            :src="artitem.cover.images[0]"
          />
        </div>
      </div>
      <div class="imglist" v-if="artitem.cover.type == 3">
        <van-image
          v-for="(item, index) in artitem.cover.images"
          :key="index"
          class="imgitem"
          :src="item"
        />
      </div>
      <div class="tip">
        <span :class="{ red: artitem.is_top == 1 }">
          {{ artitem.is_top == 1 ? "置顶" : "未置顶" }}
        </span>
        <span>{{ artitem.aut_name }}</span>
        <span>{{ artitem.comm_count }}评论</span>
        <span>{{ artitem.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 2、3张封面 -->
    <!-- <div class="itemone">
      <div class="itemthree">
        <div class="title">文章标题</div>
      </div>
      <div class="imglist" v-if="artitem.cover.type == 3">
        <van-image class="imgitem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-image class="imgitem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-image class="imgitem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="tip">
        <span>置顶</span>
        <span>章三</span>
        <span>87评论</span>
        <span>1小时前</span>
      </div>
    </div> -->
    <!-- 3、1张封面 -->
    <!-- <div class="itemone">
      <div class="itemthree">
        <div class="title wd447">文章标题</div>
        <div class="imglist imgone">
          <van-image width="100%" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
      <div class="tip">
        <span>置顶</span>
        <span>章三</span>
        <span>87评论</span>
        <span>1小时前</span>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    artitem: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    artview() {
      this.$router.push({ path: `/article/${this.artitem.art_id}` });
    },
  },
};
</script>
<style scoped lang="less">
.itemone {
  padding: 24px 28px;
  background: #fff;
  border-bottom: 2px solid #edeff3;
  .title {
    font-size: 32px;
    line-height: 32px;
    color: #3a3a3a;
    margin-bottom: 24px;
  }
  .tip {
    font-size: 24px;
    line-height: 24px;
    color: #b4b4b4;
    .red {
      color: red;
    }
    span {
      margin-right: 26px;
    }
  }
  .imglist {
    margin-bottom: 30px;
    .imgitem {
      width: 33.3%;
      height: 146px;
      padding: 0px 2px;
      box-sizing: border-box;
      // margin-right: 4px;
    }
  }
  .itemthree {
    overflow: hidden;
  }
  .wd447 {
    width: 446px;
    float: left;
  }
  .imgone {
    width: 232px;
    height: 146px;
    float: right;
  }
}
</style>
