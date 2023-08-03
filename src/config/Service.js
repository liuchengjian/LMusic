import axios from 'axios';
import {Const} from "./Const";
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
axios.default.baseURL = Const.baseURL;

export const Service = axios.create({
  timeout: Const.timeout,
  // baseURL: getIP(),
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  validateStatus: (status) => {
    //492 服务端自定义：无权限
    console.log("状态码:" + status);
    return status >= 200 && status <= 600;
  },
});
/**
 * 添加请求拦截器
 */
Service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log("请求config", config);
  // 在发送请求之前做些什么
  if (!config.url) {
    throw new Error("请求地址为空");
  }
  config.baseURL = Const.baseURL;
  if(config.removePending){
    removePending(config.url, ""); //检查前移除 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
  }
  console.log("---------请求开始-----------");
  //请求时间
  // console.log(TimeUtils.dateFormat(TimeUtils.dateTime, new Date()));
  console.log(
    "请求地址：" +
    (config?.url.startsWith("/")
      ? config?.baseURL + config?.url
      : config?.url)
  );

  console.log("请求方式：" + JSON.stringify(config?.method));
  console.log(
    "请求参数：" + JSON.stringify(config?.params || config?.data)
  );
  Object.assign(config.headers, {cookie: global.token});
  // console.log('请求头headers：' + JSON.stringify(config.headers));
  if (!config.notCheckToken && !Const.token) {
    removePending(config.url, "token失效，请重新登录");
    //无token跳转到登录界面
    config.callBack && config.callBack();
    return config;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log("对请求错误做些什么", error);
  return Promise.reject(error);
});

/**
 * 添加响应拦截器
 */
Service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response?.data;
  console.log('响应结果：' + JSON.stringify(data));
  console.log("---------请求结束-----------");
  removePending(response.config.url, "正常移除");
  if (data && data.code === Const.Ok) {
    if(data?.data){
      return data.data;
    } else if(data?.act){
      return data.act;
    }
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log("响应数据错误", error);
  return Promise.reject(error);
});


/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = config.url;
  config.cancelToken =
    config?.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        console.log("添加的url", url);
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (url, msg = "") => {
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(msg);
    console.log("取消当前请求的url", url);
    pending.delete(url);
  }
};
