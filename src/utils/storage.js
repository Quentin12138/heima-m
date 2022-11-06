import store from "@/store";
//存缓存方法
export const setItem = (key, value) => {
  //当对数据进行存储时，如果数据为数组或对象，将存储失败，需要转JSON字符串处理
  if (typeof value == "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

//读缓存的方法

export const getItem = (key) => {
  let obj = localStorage.getItem(key);
  //当对一个字符串或数字进行JSON.parse()时，必然报错，会走到catch方法，原地返回数据
  try {
    return JSON.parse(obj);
  } catch (error) {
    return obj;
  }
};

//清空缓存的方法
export const removeStor = () => {
  localStorage.clear();
  store.commit("setToken", null);
};
