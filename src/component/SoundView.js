import React, {useEffect} from 'react';
import {Animated, View, StyleSheet, Text, ActivityIndicator} from "react-native";
import {PlaySlider} from "../widget/PlaySlider";
import Touchable from "./Touchable";
import {observer, useLocalStore} from "mobx-react";
import SoundStore from "../store/SoundStore";

const SoundView = (props) => {
  const store = useLocalStore(() => new SoundStore());
  let url = 'http://m7.music.126.net/20230808113447/f95d31fcb4c82f1d1faa0037edfd9435/ymusic/c77a/a835/4cf9/230be6702e804d761ad83a865c822913.mp3'
  useEffect(() => {
    store.initMusic(url)
  }, [])


  return (<View style={styles.container}>
    <View style={styles.imageView}>

    </View>
    <PlaySlider
      store={store}
    />
    <View style={styles.control}>
      <Touchable
        onPress={() => {
        }}
        style={styles.button}>
        <Text style={{color: "#fff"}}>{'上一首'}</Text>
      </Touchable>

      {store.playState===''? <ActivityIndicator
        color={"#2F54EB"}
        style={styles.button}
        size={"small"}
        animating={true}
      />:
        <Touchable onPress={() =>store.playOrPauseMusic()} style={styles.button}>
          <Text style={{color: "#fff"}}>{store.playState === 'playing' ? '暂停' : '播放'}</Text>
        </Touchable>
      }
      <Touchable
        onPress={() => {
        }}
        style={styles.button}>
        <Text style={{color: "#fff"}}>{'下一首'}</Text>
      </Touchable>
    </View>
  </View>)
}
export default observer(SoundView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
  imageView: {
    alignItems: 'center',
    height: 200,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },

});
