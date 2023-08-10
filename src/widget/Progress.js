import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';



class Progress extends React.Component {
  render() {
    const {children, currentTime, duration} = this.props;
    const fill = duration ? (currentTime / duration) * 100 : 0;
    return (
      <AnimatedCircularProgress
        size={25}
        width={2}
        tintColor="#f86442"
        backgroundColor="#ededed"
        fill={fill}>
        {() => <>{children}</>}
      </AnimatedCircularProgress>
    );
  }
}

export default Progress;
