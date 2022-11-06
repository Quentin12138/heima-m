<template>
  <div>
    <div>
      <van-cell
        v-for="(item, index) in suggestionList"
        :key="index"
        icon="search"
        @click="$emit('keyWorld', item)"
      >
        <template #title>
          <div v-html="textdata(item)"></div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { searchSuggestionApi } from "@/api/search";
import { debounce } from "lodash";
export default {
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      suggestionList: [],
    };
  },
  methods: {
    textdata(val) {
      const highlightStr = `<span style="color:lightblue">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return val.replace(reg, highlightStr);
    },
  },
  watch: {
    searchText: {
      handler: debounce(async function (newVal) {
        console.log(newVal);
        try {
          let obj = {
            q: this.searchText,
          };
          let { data } = await searchSuggestionApi(obj);
          if (data.data.options[0] != null) {
            this.suggestionList = data.data.options;
          }
        } catch (err) {
          console.log(err);
        }
      }, 1000),
      // 页面一进来就执行侦听
      immediate: true,
    },
  },
};
</script>

<style></style>
