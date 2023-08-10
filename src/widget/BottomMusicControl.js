import React, {useEffect} from 'react';
import {Animated, View, StyleSheet, Image, Text, Easing} from "react-native";
import {observer, useLocalStore} from "mobx-react";
import SoundStore from "../store/SoundStore";
import Touchable from "../component/Touchable";
import {MusicDetailIcon, PauseIcon, PlayIcon} from "../svg/Icon";
import Progress from "./Progress";
import {viewportWidth} from "../utils/utils";

const BottomMusicControl = (props) => {
  const {store} = props
  // const store = useLocalStore(() => new SoundStore());
  let anim = new Animated.Value(0);
  let rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  let timing;
  useEffect(() => {
    store?.queryMusicList()
    if (store?.musicList?.length) {
      store?.initMusic(store?.musicList[0].url)
    }
  }, [store?.musicList?.[0]?.url])
  useEffect(() => {
    timing = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    )
    if (store?.playState === 'playing') {
      timing.start();
      // timingImage.start();
    } else if (store?.playState === 'paused') {
      timing.stop();
    }
  }, [store?.playState])

  return store?.musicList?.length > 0 ?
    (<View style={styles.container}>
      <Animated.View style={{transform: [{rotate: rotate}]}}>
        <Image style={styles.image} source={{uri: store?.musicList[0].thumbnailUrl}}/>
      </Animated.View>
      <Text numberOfLines={1} style={styles.title}>
        {store?.musicList[0].title}
      </Text>
      <Touchable
        onPress={() => {
          store.playOrPauseMusic()
        }}
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Progress
          currentTime={store.currentTime}
          duration={store.duration}
        >
          {store.playState === 'playing' ? <PauseIcon/> : <PlayIcon/>}
        </Progress>
      </Touchable>
      <Touchable
        onPress={() => {
        }}
        style={{marginHorizontal: 20}}>
        <MusicDetailIcon/>
      </Touchable>
    </View>)
    : null
}
export default observer(BottomMusicControl);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: viewportWidth,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  image: {marginLeft: 10, height: 40, width: 40, borderRadius: 5},
  title: {marginHorizontal: 10, flex: 1,},
});
