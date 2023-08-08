import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from 'react-native-slider-x';
import {formatTime} from "../utils/utils";


export const PlaySlider = (props) => {
  const {store} = props;
  const [currentTime, setCurrentTime] = useState(store.currentTime||0);
  const [duration, setDuration] = useState(store.duration||0);
  const [isTouch, setTouch] = useState(false);
  useEffect(() => {
    if(isTouch){
      return
    }
    setCurrentTime(store.currentTime)
    setDuration(store.duration)
  },[store.currentTime,store.duration])

  const renderThumb = () => {
    return (
      <View>
        <Text style={styles.text}>
          {formatTime(currentTime)}/{formatTime(duration)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Slider
        value={currentTime}
        maximumValue={duration}
        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
        minimumTrackTintColor="white"
        renderThumb={renderThumb}
        thumbStyle={styles.thumb}
        onSlidingStart={(e) => {
          setTouch(true)
        }}
        onSlidingComplete={(e) => {
          setTouch(false)
          store.setMusicCurrentTime(e)
          store.playOrPauseMusic(true)
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
});
