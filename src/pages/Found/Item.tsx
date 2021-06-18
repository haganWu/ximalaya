import {IFound} from '@/models/found';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';

interface IProps {
  data: IFound;
  setCurrentId: (id: string) => void;
  paused: boolean;
}

class Item extends React.Component<IProps> {
  onPlay = () => {
    const {data, setCurrentId} = this.props;
    setCurrentId(data.id);
  };
  onPause = () => {
    const {setCurrentId} = this.props;
    setCurrentId('');
  };

  render() {
    const {data, paused} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <VideoControls
          paused={paused}
          onPlay={this.onPlay}
          onPause={this.onPause}
          source={{uri: data.videoUrl}}
          style={styles.video}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'black',
  },
  video: {
    height: 220,
  },
});

export default Item;
