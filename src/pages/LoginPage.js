import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';

import NavigationUtil from "../navigator/NavigationUtil";

export const LoginPage=(props)=>   {
  NavigationUtil.navigation = props.navigation
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <TouchableOpacity onPress={() => {
          NavigationUtil.goPage("main",{})
        }}>
          <Text>{"登录"}</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}
