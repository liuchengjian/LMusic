import {Service} from "./Service";

const defaultConfig = {
  notCheckToken: false, //不需要检查token
  removePending: true,
  callBack: () => {
    //无token跳转到登录界面
    // NavigationUtil.goPage(ModuleType.login,{isReLogin: true});
  },
};

const setConfig = (config) => {
  return {
    ...defaultConfig,
    ...config,
  };
};

export const toLogin = (params) => {
  return Service(
    setConfig({
      url: "/login/cellphone",
      method: 'get',
      params: params,
      notCheckToken: true,
    }),
  );
};

/**
 * 发现列表
 */
export const findList = (params) => {
  return Service(
    setConfig({
      url: '/homepage/block/page?timestamp=' + new Date().getTime(),
      method: 'get',
      params: params,
      notCheckToken: true
    }),
  );
};
export const findBall = (params) => {
  return Service(
    setConfig({
      url: '/homepage/dragon/ball',
      method: 'get',
      params: params,
      notCheckToken: true
    }),
  );
};
export const hotTopic = (params) => {
  return Service(
    setConfig({
      url: '/hot/topic',
      method: 'get',
      params: params,
      notCheckToken: true
    }),
  );
};
export const topicDetail = (params) => {
  return Service(
    setConfig({
      url: '/topic/detail',
      method: 'get',
      params: params,
      notCheckToken: true,
      removePending: false
    }),
  );
};
