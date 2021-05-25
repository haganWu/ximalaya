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

let Iconfaxian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1011.2C236.8 1011.2 12.8 787.2 12.8 512S236.8 12.8 512 12.8 1011.2 236.8 1011.2 512 787.2 1011.2 512 1011.2z m0-921.6C279.04 89.6 89.6 279.04 89.6 512S279.04 934.4 512 934.4 934.4 744.96 934.4 512 744.96 89.6 512 89.6z"
        fill={getIconColor(color, 0, '#ff562a')}
      />
      <Path
        d="M205.056 742.144l244.48-355.072 358.656-92.16-206.592 307.456-396.544 139.776zM496.64 454.4l-94.208 136.96 150.016-52.736 79.872-119.04-135.68 34.816z"
        fill={getIconColor(color, 1, '#ff562a')}
      />
    </Svg>
  );
};

Iconfaxian.defaultProps = {
  size: 18,
};

Iconfaxian = React.memo ? React.memo(Iconfaxian) : Iconfaxian;

export default Iconfaxian;
