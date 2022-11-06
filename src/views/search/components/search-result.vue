<template>
  <div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultApi } from "@/api/search";
export default {
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    async onLoad() {
      try {
        let obj = {
          page: this.page,
          per_page: 10,
          q: this.searchText,
        };
        let { data } = await searchResultApi(obj);
        this.page++;
        if (data.data.results.length != 0) {
          this.list.push(...data.data.results);
          this.loading = false;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
  created() {},
};
</script>

<style></style>
