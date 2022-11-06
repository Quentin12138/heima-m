import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import Vant from "vant";
import "vant/lib/index.css";
//要想覆盖vant样式，后引入我们自己的全局样式
import "@/style/index.less";
import "@/utils/datetime";
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
