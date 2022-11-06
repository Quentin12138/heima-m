import moment from "moment";
import Vue from "vue";

//设置全局时间汉化
moment.locale("zh-cn");
//使用全局的过滤器
//Vue.filter("过滤器的名字", (传过来的值) => {});
Vue.filter("relativeTime", (value) => {
  //不要漏掉return ，要把处理好的数据返回原来的地方
  return moment(value, "YYYYMMDD").fromNow();
});
