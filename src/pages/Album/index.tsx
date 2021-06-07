import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '@/navigator/index';
import IconFont from '@/assets/iconfont';
import {head} from 'lodash';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

//传递值 需先声明IProps接口
interface IProps extends MadelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
}

class Album extends React.Component<IProps> {
  componentDidMount() {
    const {route, dispatch} = this.props;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id: route.params.item.id,
      },
    });
  }

  renderHeader = () => {
    const {headerHeight, summary, author, route} = this.props;
    const {title, image} = route.params.item;
    return (
      <View style={[styles.headerContainer, {paddingTop: headerHeight}]}>
        <Image style={styles.backgroundPic} source={{uri: image}} />
        <View style={styles.leftView}>
          <Image style={styles.thumbnail} source={{uri: image}} />
        </View>

        <View style={styles.rightView}>
          <Text numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.titleSummary}>
            {summary}
          </Text>
          <View style={styles.authorContainer}>
            <Image style={styles.authorIcon} source={{uri: author.avatar}} />
            <Text style={styles.authorName}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    // const {headerHeight, summary, author, route} = this.props;
    // const {title, image} = route.params.item;
    return <View>{this.renderHeader()}</View>;
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 260,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  backgroundPic: {
    ...StyleSheet.absoluteFillObject, //绝对定位
    backgroundColor: '#eee',
  },
  leftView: {},
  thumbnail: {
    width: 100,
    height: 100,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#dedede',
  },
  rightView: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '900',
  },
  titleSummary: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    marginVertical: 12,
    borderRadius: 4,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  authorName: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
});

function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Album {...props} headerHeight={headerHeight} />;
}

export default connector(Wrapper);
