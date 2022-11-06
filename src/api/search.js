import request from "@/utils/request";
//
export const searchSuggestionApi = (params) =>
  request({
    url: "/v1_0/suggestion",
    method: "get",
    params,
  });

// 获取搜索结果
export const searchResultApi = (params) =>
  request({
    url: "/v1_0/search",
    method: "get",
    params,
  });
