import request from "@/utils/request";
//获取文章详情
export const articleApi = (article_id) =>
  request({
    url: `/v1_0/articles/${article_id}`,
    method: "get",
  });

// 关注作者
export const followGoApi = (data) =>
  request({
    url: "/v1_0/user/followings",
    method: "post",
    data,
  });
// 取关作者
export const followOutApi = (target) =>
  request({
    url: `/v1_0/user/followings/${target}`,
    method: "delete",
  });
// 文章收藏
export const collectionGoApi = (data) =>
  request({
    url: "/v1_0/article/collections",
    method: "post",
    data,
  });
// 取消文章收藏
export const collectionOutApi = (target) =>
  request({
    url: `/v1_0/article/collections/${target}`,
    method: "delete",
  });
// 文章点赞
export const goodjobGoApi = (data) =>
  request({
    url: "/v1_0/article/likings",
    method: "post",
    data,
  });
// 取消文章收藏
export const goodjobOutApi = (target) =>
  request({
    url: `/v1_0/article/likings/${target}`,
    method: "delete",
  });
