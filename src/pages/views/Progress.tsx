import {RootState} from '@/models/index';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {connect, ConnectedProps} from 'react-redux';

interface IProps {
  currentTime: number;
  duration: number;
}

class Progress extends React.Component<IProps> {
  render() {
    const {children, currentTime, duration} = this.props;
    const fill = duration ? (currentTime / duration) * 100 : 0;
    return (
      <AnimatedCircularProgress
        size={40}
        width={2}
        tintColor="#f86442"
        backgroundColor="#ededed"
        fill={fill}>
        {() => <>{children}</>}
      </AnimatedCircularProgress>
    );
  }
}
export default Progress;
