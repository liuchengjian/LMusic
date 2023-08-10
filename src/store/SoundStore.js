import React from 'react';
import {action, observable} from "mobx";
import {getCurrentTime, getDuration, init, isPlaying, pause, play, setCurrentTime} from "../component/sound";
import {queryRealm, saveRealm} from "../realm/realm";
import {findBall, songUrl} from "../config/Http";
import {Const} from "../config/Const";

export default class SoundStore {
  @observable url = ""
  @observable playState = "";
  @observable duration = 0;
  @observable currentTime = 0;
  @observable isPlaying = false;
  @observable musicList = [];
  @action
  initUrl = (url) => {
    // this.isPlaying = url
  }
  interval = "";

  /**
   * 初始化播放器
   * @param url
   * @returns {Promise<void>}
   */
  initMusic = async (url) => {
    this.playState = ''
    try {
      const res = await init(url)
      this.duration = getDuration()
    } catch (e) {
      this.duration = 0
    } finally {
      this.playState = 'init'
    }
  }
  /**
   * 播放音乐
   * @returns {Promise<void>}
   */
  playMusic = () => {
    const res = play()
    this.playState = 'playing'
    console.log('isPlaying', this.playState)

  }
  /**
   * 暂停音乐
   * @returns {Promise<void>}
   */
  pauseMusic = async () => {
    const res = await pause()
    this.playState = 'pause'
    this.clearInterval()
  }

  playOrPauseMusic = (onlyPlay) => {
    if (!onlyPlay &&this.playState === 'playing') {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
    this.currentMusicTime()
  }

  setMusicCurrentTime = (time) => {
    setCurrentTime(time)
  }
  /**
   * 停止音乐
   * @returns {Promise<void>}
   */
  stopMusic = async () => {
    const res = await stop()
    this.playState = 'stop'
    this.clearInterval()
  }

  /**
   * 当前时间 带1s定时器
   * @returns {Promise<void>}
   */
  currentMusicTime = () => {
    this.duration = getDuration()
    this.interval = setInterval(async () => {
      const res = await getCurrentTime()
      this.currentTime = res || 0
      // console.log(this.currentTime)
    }, 1000)
  }
  /**
   * 清除当前的定时器
   */
  clearInterval = () => {
    this.interval && clearInterval(this.interval)
    this.interval = ""
  }

  isMusicPlaying = () => {
    const res = isPlaying()
  }

  musicUrl = async (id, title, thumbnailUrl) => {
    let res = await songUrl({id, cookie: Const.token});
    if (res?.length) {
      this.addMusicList({
        id: res[0].id + "",
        title: title,
        thumbnailUrl: thumbnailUrl,
        url: res[0].url || '',
        duration: res[0].size,
        rate: new Date().getTime()
      })
    }
  }

  addMusicList = (data) => {
    saveRealm('Music', data)
    this.queryMusicList()
  }

  queryMusicList = () => {
    const data = queryRealm("Music").sorted('rate', true);
    this.musicList = data;
  }


}
