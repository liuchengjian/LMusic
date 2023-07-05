/*
 * @Author: LR
 * @Date: 2022-01-19 14:01:16
 * @LastEditTime: 2022-07-21 17:12:43
 * @LastEditors: LR
 * @Description:Android物理返回键 监听及实现
 * @FilePath: /rn-dqgb-ui/src/utils/AndroidBackPress.js
 */
import {BackHandler,Platform} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
const isIos = Platform.OS === 'ios' ? true : false
/**
 *useEffect(() => {
 *  const androidBack = new AndroidBackPress();
 *  return androidBack.remove;
 *}, []);
 */
export default class AndroidBackPress {
  constructor(customBackPress) {
    if (!isIos) {
      //自定义返回事件
      this.customBackPress = customBackPress;
      BackHandler.addEventListener(
        'hardwareBackPress',
        customBackPress || this.hardwareBackPress,
      );
    }
  }

  remove = () => {
    !isIos &&
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.customBackPress || this.hardwareBackPress,
      );
  };

  hardwareBackPress = () => {
    const navState = NavigationUtil.navigation?.getState();
    const {index, routes} = navState || {};
    const curRoute = routes?.[index]?.name;
    console.log('fn...', curRoute);
    if (!navState) {
      // this.onExitApp();
      return true;
    }
    // if (exitPages?.name?.includes(curRoute)) {
    //   this.onExitApp();
    //   return true;
    // }
    this.onGoBack();

    return true;
  };

  onGoBack() {
    if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
      Console.info('您操作的太快了');
    } else {
      NavigationUtil.goBack();
      this.lastBackPressed = Date.now();
    }
  }

  onExitApp() {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    console.log('再按一次退出应用');
    return true;
  }
}
