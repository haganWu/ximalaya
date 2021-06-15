import {number} from 'echarts';
import {reject} from 'lodash';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

/**
 * 创建播放器
 * @param url 播放地址
 * @returns
 */
const init = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    sound = new Sound(url, '', error => {
      if (error) {
        console.log('error --------:', error);
        reject(error);
      } else {
        console.log('创建播放器 --------');
        resolve();
      }
    });
  });
};

/**
 * 播放
 */
const play = () => {
  return new Promise<void>((resolve, reject) => {
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('播放 --------');
          resolve();
        } else {
          console.log('播放 -------- 失败');
          reject();
        }

        //释放资源
        // sound.release();
      });
    } else {
      reject();
    }
  });
};

/**
 * 暂停
 */
const pause = () => {
  return new Promise<void>(resolve => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

/**
 * 停止
 */
const stop = () => {
  return new Promise<void>(resolve => {
    if (sound) {
      sound.stop(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

/**
 * 获取当前播放时间
 */
const getCurrentTime = (): Promise<number> => {
  return new Promise(resolve => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

/**
 * 获取音频时长
 */
const getDuration = (): number => {
  if (sound) {
    // console.log('getDuration-->成功返回:', sound.getDuration);
    return sound.getDuration();
  }
  console.log('getDuration-->异常返回:', 0);
  return 0;
};

const skipProgress = (progress: number) => {
  return new Promise<void>(resolve => {
    if (sound) {
      sound.setCurrentTime(progress);
    } else {
      resolve();
    }
  });
};

export {init, play, pause, getCurrentTime, getDuration, stop, skipProgress};
