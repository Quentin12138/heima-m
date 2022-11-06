<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        class="searchclose"
        @focus="searchListShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="searchListShow" :searchText="searchText" />
    <!-- 搜索联想 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @keyWorld="keyWorld"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistoryArr="searchHistoryArr"
      @openResult="openResult"
      @deleteAll="searchHistoryArr = []"
    />
  </div>
</template>

<script>
import searchHistory from "./components/search-history.vue";
import searchResult from "./components/search-result.vue";
import searchSuggestion from "./components/search-suggestion.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion,
  },
  data() {
    return {
      searchText: "",
      searchListShow: false,
      searchHistoryArr: getItem("searchHistory") || [],
    };
  },
  methods: {
    onSearch(val) {
      this.$store(val);
    },
    onCancel() {
      this.$router.push({ path: "/home" });
    },
    keyWorld(val) {
      let num = this.searchHistoryArr.indexOf(val);
      if (num != -1) {
        this.searchHistoryArr.splice(num, 1);
      }
      this.searchHistoryArr.unshift(val);
      this.searchText = val;
      this.searchListShow = true;
    },
    openResult(val) {
      this.searchText = val;
      this.searchListShow = true;
    },
  },
  watch: {
    searchHistoryArr: {
      handler(newVal) {
        console.log(newVal);
        setItem("searchHistory", newVal);
      },
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .searchclose {
  .van-search__action {
    color: white;
  }
}
</style>
