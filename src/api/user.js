import request from "@/utils/request";
// import store from "@/store";

export const loginapi = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "post",
    data,
  });

//请求用户信息
export const userinfo = () =>
  request({
    url: "/v1_0/user",
    method: "get",
    // Bearer和token中间要留有空格
    // headers: { Authorization: `Bearer ${store.state.token.token}` },
  });
