// 评论相关接口

import request from "@/utils/request";

export const getCommentListApi = (params) =>
  request({
    url: "/v1_0/comments",
    method: "get",
    params,
  });
// 对评论点赞
export const likeGoApi = (data) =>
  request({
    url: "/v1_0/comment/likings",
    method: "post",
    data,
  });
// 取消点赞
export const likeOutApi = (target) =>
  request({
    url: `/v1_0/comment/likings/${target}`,
    method: "delete",
  });
// 取消点赞
export const commentPostApi = (data) =>
  request({
    url: "/v1_0/comments",
    method: "post",
    data,
  });
