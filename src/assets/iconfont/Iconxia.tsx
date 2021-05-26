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

let Iconxia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M56.888889 335.644444l56.888889-62.577777 398.222222 364.088889L910.222222 273.066667l56.888889 62.577777-455.111111 415.288889z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconxia.defaultProps = {
  size: 18,
};

Iconxia = React.memo ? React.memo(Iconxia) : Iconxia;

export default Iconxia;
