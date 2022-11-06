import axios from "axios";
import store from "@/store";
// axios.defaults.baseURL = "http://toutiao.itheima.net";
//两种写法没有区别
const request = axios.create({
  baseURL: "http://toutiao.itheima.net", // 基础路径
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    //config包含了当前请求的配置信息
    //我们可以在当前的配置信息内，添加headers参数
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token.token}`;
    }
    // 在发送请求之前做些什么
    //config 需要再return一下，如果没有return，则本次请求就卡住了，到不了服务端
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
//向外导出axios实例
export default request;
