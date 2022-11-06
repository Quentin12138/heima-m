import request from "@/utils/request";

//获取用户的频道列表
export const userChannesListApi = () =>
  request({
    url: "/v1_0/user/channels",
    method: "get",
  });

//获取用户的文章列表
export const userArtListApi = (params) =>
  request({
    url: "/v1_0/articles",
    method: "get",
    params,
  });

//获取所有的频道列表
export const allChannesListApi = () =>
  request({
    url: "/v1_0/channels",
    method: "get",
  });

//获取所有的频道列表
export const setUserChannesListApi = (channels) =>
  request({
    url: "/v1_0/user/channels",
    method: "put",
    data: {
      channels,
    },
  });
