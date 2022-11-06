import Vue from "vue";
import Vuex from "vuex";
import { setItem, getItem } from "@/utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // text: 123,
    token: getItem("token"),
    newcomment: {},
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
  },
  actions: {},
  modules: {},
});
