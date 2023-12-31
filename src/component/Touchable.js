import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

const Touchable = React.memo(
  ({style, onPress, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    let throttleOnPress = undefined;
    if(typeof onPress === 'function') {
      throttleOnPress = useCallback(_.throttle(onPress, 1000, {leading: true, trailing: false}), [onPress]);
    }
    return (
      <TouchableOpacity onPress={throttleOnPress} style={touchableStyle} activeOpacity={0.8} {...rest} />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Touchable;
