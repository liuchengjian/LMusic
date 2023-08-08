import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

// 创建播放器
const init = (url: string) => {
  console.log(url)
  return new Promise((resolve, reject) => {
    sound = new Sound(url, '', error => {
      if (error) {
        console.log('创建播放器失败', error)
        reject(error);
      } else {
        resolve(true);
        console.log('创建播放')
      }
    });
  });
};

// 播放，直到播放完成才会返回
const play = () => {
  sound?.play(success => {
    console.log('播放--', success)
    if (success) {
    } else {
    }
  });
};

// 暂停
const pause = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

const stop = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.stop(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// 获取当前播放时间
const getCurrentTime = () => {
  return new Promise(resolve => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

const setCurrentTime = (time) => {
  if (sound && sound.isLoaded()) {
    sound.setCurrentTime(time);
  }
};

// 获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  }
  return 0;
};

const isPlaying = () => {
  debugger
  if (sound) {
    return sound.isPlaying();
  }
  return false
};

export {init, play, pause, stop, getCurrentTime, setCurrentTime, getDuration, isPlaying};
