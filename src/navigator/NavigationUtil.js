/*
 * @Author: LR
 * @Date: 2021-12-20 14:52:30
 * @LastEditTime: 2022-07-21 17:26:36
 * @LastEditors: LR
 * @Description:
 * @FilePath: /rn-dqgb-ui/src/navigator/NavigationUtil.js
 */
import {BackHandler, NativeModules} from 'react-native';

/**
 * Author:liucj
 * date: 2020-7-7
 * 全局导航跳转工具类
 *
 */
export default class NavigationUtil {
  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation = NavigationUtil.navigation) {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  }

  static exit() {
    // global.isIOS
    //   ? NativeModules.OpenNativeModule.goBack?.()
    //   : BackHandler.exitApp();
    BackHandler.exitApp()
  }

  /**
   * 跳转到指定页面
   * @param params 要传递的参数
   * @param page 要跳转的页面名
   **/
  static goPage(page, params = {}) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('导航为空');
      return;
    }
    if (!page) {
      console.log('页面为空');
      return;
    }
    navigation.navigate(page, {
      ...params,
    });
  }
}
