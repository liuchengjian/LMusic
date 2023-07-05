/*
 * @Author: LR
 * @Date: 2022-01-09 08:33:45
 * @LastEditTime: 2022-07-22 13:51:39
 * @LastEditors: LR
 * @Description:
 * @FilePath: /rn-dqgb-ui/src/navigator/BaseNavigator.js
 */
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

/**
 *
 * @param {*} param
 * name 组件名
 * component 组件
 * headerShown 是否显示系统标题栏，默认不显示 如果headerMode为none，则都不显示
 * @returns
 */
export const stackScreen = ({
  name,
  component,
  headerShown,
  gestureEnabled,
  params,
}) => {
  return component ? (
    <Stack.Screen
      key={name}
      name={name}
      component={component}
      options={{
        headerShown: headerShown || false,
        gestureEnabled: gestureEnabled || false,
      }}
      initialParams={params}
    />
  ) : null;
};

/**
 * stack navigator
 * moduleData:{name, component, headerShown, gestureEnabled}
 * @param {*} props
 * @returns
 */
export const RootNavigator = (props) => {
  const {initialRouteName, moduleData, mode, options} = props;
  return (
    <Stack.Navigator
      headerMode={mode || 'float'} //float这是iOS上的常见模式。screen淡入和淡出。none -没有标题将被呈现。
      initialRouteName={initialRouteName}
      screenOptions={
        options || {
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true, //开启手势滑动
          gestureDirection: 'horizontal',
        }
      }>
      {moduleData?.map((item) => {
        return stackScreen(item);
      })}
    </Stack.Navigator>
  );
};

/**
 * 导航容器
 * @param {*} props
 * @returns
 */
export const NavContainer = (props) => {
  return (
    <NavigationContainer>
      <RootNavigator {...props} />
    </NavigationContainer>
  );
};
