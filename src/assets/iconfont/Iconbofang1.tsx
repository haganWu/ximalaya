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

let Iconbofang1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 71.111111c243.2 0 440.888889 197.688889 440.888889 440.888889S755.2 952.888889 512 952.888889 71.111111 755.2 71.111111 512 268.8 71.111111 512 71.111111m0-71.111111C228.977778 0 0 228.977778 0 512s228.977778 512 512 512 512-228.977778 512-512S795.022222 0 512 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M696.888889 450.844444c59.733333 35.555556 58.311111 92.444444-1.422222 126.577778L429.511111 726.755556c-54.044444 31.288889-99.555556 5.688889-99.555555-58.311112V341.333333c0-62.577778 44.088889-88.177778 96.711111-55.466666l270.222222 164.977777z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconbofang1.defaultProps = {
  size: 18,
};

Iconbofang1 = React.memo ? React.memo(Iconbofang1) : Iconbofang1;

export default Iconbofang1;
