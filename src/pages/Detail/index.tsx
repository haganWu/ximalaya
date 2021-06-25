import IconFont from '@/assets/iconfont';
import Barrage, {Message} from '@/components/Barrage';
import Touchable from '@/components/Touchable';
import storage from '@/config/storage';
import {RootState} from '@/models/index';
import {ModelStackNavigation, ModelStackParamList} from '@/navigator/index';
import {randomIndex, viewportWidth} from '@/utils/index';
import {RouteProp} from '@react-navigation/native';
import {functionsIn} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect, ConnectedProps} from 'react-redux';
import PlaySlider from './PlaySlider';

const data: string[] = [
  '最灵繁的人也看不见自己的背脊',
  '朝闻道，夕死可矣',
  '阅读是人类进步的阶梯',
  '内外相应，言行相称',
  '人的一生是短的',
  '抛弃时间的人，时间也抛弃他',
  '自信在于沉稳',
  '过犹不及',
  '开卷有益',
  '有志者事竟成',
  '合理安排时间，就等于节约时间',
  '成功源于不懈的努力',
  '业余爱好是挖坟',
  '当你凝视深渊',
  '深渊也在凝视你',
];

function getText() {
  return data[randomIndex(data.length)];
}

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    thumbnailUrl: player.thumbnailUrl,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
    id: player.id,
    currentTime: player.currentTime,
    duration: player.duration,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModelStackParamList, 'Detail'>;
  navigation: ModelStackNavigation;
}

const IMAGE_SIZE = 180;
const PADDING_TOP = (viewportWidth - IMAGE_SIZE) / 2;
const SCALE = viewportWidth / IMAGE_SIZE;

function Detail({
  dispatch,
  route,
  navigation,
  title,
  id,
  playState,
  thumbnailUrl,
  previousId,
  nextId,
}: IProps) {
  const [barrage, setBarrage] = useState(false);
  const [barrageData, setBarrageData] = useState<Message[]>([]);
  //创建引用
  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    if (route.params && id !== route.params.id) {
      dispatch({
        type: 'player/fetchPlayer',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
  }, [route, dispatch, id]);

  /**
   * @description 解决点击上一首/下一首 标题不更新问题
   * @param prevProps
   */
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  /**
   * 添加弹幕
   */
  useEffect(() => {
    //定时器  每隔1s钟执行一次
    const timmer = setInterval(() => {
      if (barrage) {
        const id = Date.now();
        const title = getText();
        setBarrageData([{id, title}]);
      }
    }, 200);

    //当前组件卸载的时候调用
    return () => {
      clearInterval(timmer);
    };
  }, [barrage]);

  /**
   * 暂停/播放
   */
  const toggle = () => {
    if (playState === 'playing') {
      dispatch({
        type: 'player/pause',
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
  };

  /**
   * 上一首
   */
  const previousPress = () => {
    dispatch({
      type: 'player/previoud',
    });
  };
  /**
   * 下一首
   */
  const nextPress = () => {
    dispatch({
      type: 'player/next',
    });
  };

  useEffect(() => {
    Animated.timing(anim.current, {
      toValue: !barrage ? 1 : SCALE,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [barrage]);

  /**
   * 弹幕
   */
  const barragePress = () => {
    setBarrage(!barrage);
  };

  const skipProgress = (progress: number) => {
    dispatch({
      type: 'player/skip',
      payload: {
        progress: progress,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Animated.Image
          style={[
            styles.image,
            {borderRadius: barrage ? 0 : 8},
            {transform: [{scale: anim.current}]},
          ]}
          source={{uri: thumbnailUrl}}
        />
      </View>

      {barrage && (
        <React.Fragment>
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={styles.LinearGradient}
          />
          <Barrage data={barrageData} maxTrack={5} style={styles.barrage} />
        </React.Fragment>
      )}

      <Touchable
        style={styles.barrageBtn}
        disabled={!previousId}
        onPress={barragePress}>
        <Text style={styles.barrageText}>弹幕</Text>
      </Touchable>

      <PlaySlider skipProgress={skipProgress} />

      <View style={styles.bottomContainer}>
        <Touchable disabled={!previousId} onPress={previousPress}>
          <IconFont name={'iconnext'} size={30} color="#fff" />
        </Touchable>

        <Touchable onPress={toggle}>
          <IconFont
            name={playState === 'playing' ? 'iconstop' : 'iconbofang2'}
            size={30}
            color="#fff"
          />
        </Touchable>

        <Touchable disabled={!nextId} onPress={nextPress}>
          <IconFont name={'iconxiayishou'} size={30} color="#fff" />
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  imageView: {
    alignItems: 'center',
    height: IMAGE_SIZE,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    paddingVertical: 1,
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 80,
  },
  LinearGradient: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
  barrage: {
    marginTop: PADDING_TOP,
  },
});

export default connector(Detail);
