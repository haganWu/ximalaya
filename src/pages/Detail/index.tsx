import {RootState} from '@/models/index';
import {ModelStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModelStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route} = this.props;
    dispatch({
      type: 'player/fetchPlayer',
      payload: {
        id: route.params.id,
      },
    });
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/fetchPause',
    });
  }

  render() {
    return (
      <View>
        <Text>Detail</Text>
      </View>
    );
  }
}
export default connector(Detail);
