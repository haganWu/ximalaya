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

let IconvolumeOff: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M645.47136 201.152v621.728q0 14.848-10.848 25.728t-25.728 10.848-25.728-10.848l-190.272-190.272H243.16736q-14.848 0-25.728-10.848t-10.848-25.728v-219.424q0-14.848 10.848-25.728t25.728-10.848h149.728l190.272-190.272q10.848-10.848 25.728-10.848t25.728 10.848 10.848 25.728z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconvolumeOff.defaultProps = {
  size: 18,
};

IconvolumeOff = React.memo ? React.memo(IconvolumeOff) : IconvolumeOff;

export default IconvolumeOff;
