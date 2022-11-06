import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    //路由懒加载的写法
    component: () => import("@/views/login/LoginIndex"),
  },
  {
    path: "/",
    // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import("@/views/layout/LayOut"),
    children: [
      {
        path: "home", // 默认子路由，只能有1个
        name: "home",
        component: () => import("@/views/home/HomeIndex"),
      },
      {
        path: "qa",
        name: "qa",
        component: () => import("@/views/question/QuestionIndex"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video/VideoIndex"),
      },
      {
        path: "my",
        name: "my",
        component: () => import("@/views/my/MyIndex"),
      },
    ],
  },
  {
    // 搜索页面
    path: "/search",
    // 路由懒加载的写法
    component: () => import("@/views/search/searchIndex.vue"),
  },
  {
    // 文章详情页面
    path: "/article/:articleId",
    component: () => import("@/views/article/articleIndex.vue"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
