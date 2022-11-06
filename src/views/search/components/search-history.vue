<template>
  <div>
    <div class="tltle">搜索历史</div>
    <div>
      <van-cell title="单元格">
        <span v-if="deleteShow" @click="$emit('deleteAll')">全部删除</span
        >&ensp;
        <span v-if="deleteShow" @click="deleteShow = !deleteShow">完成</span>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon v-if="!deleteShow">
          <van-icon
            name="delete"
            class="search-icon"
            @click="deleteShow = !deleteShow"
          />
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistoryArr"
        :key="index"
        @click="delitemfn(index)"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="close" class="search-icon" v-if="deleteShow" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchHistoryArr: {
      type: Array,
    },
  },
  data() {
    return {
      deleteShow: false,
    };
  },
  methods: {
    delitemfn(index) {
      if (this.deleteShow) {
        // 删除状态，删除点击的数据
        this.searchHistoryArr.splice(index, 1);
      } else {
        this.$emit("openResult", this.searchHistoryArr[index]);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 12px;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 40px;
  line-height: inherit;
}
</style>
>
