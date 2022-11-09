import Vue from "vue";
import Vuex from "vuex";
import { setItem, getItem } from "@/utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // text: 123,
    token: getItem("token"),
    newcomment: {},
    articleId: "",
    userinfo: {},
  },
  getters: {},
  mutations: {
    setToken(state, tok) {
      state.token = tok;
      setItem("token", tok);
      // localStorage.setItem("token", tok);
    },
    setcomment(state, obj) {
      state.newcomment = obj;
    },
    setarticleId(state, num) {
      state.articleId = num;
    },
    setiserinfo(state, obj) {
      state.userinfo = obj;
    },
  },
  actions: {},
  modules: {},
});
