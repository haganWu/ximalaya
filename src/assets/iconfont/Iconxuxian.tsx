/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Iconxuxian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 548.571429v-36.571429h146.285714v36.571429H0z m219.428571 0v-36.571429h146.285715v36.571429H219.428571z m219.428572 0v-36.571429h146.285714v36.571429h-146.285714z m219.428571 0v-36.571429h146.285715v36.571429h-146.285715z m219.428572 0v-36.571429h146.285714v36.571429h-146.285714z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconxuxian.defaultProps = {
  size: 18,
};

Iconxuxian = React.memo ? React.memo(Iconxuxian) : Iconxuxian;

export default Iconxuxian;
