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

let Iconshouye: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M566.1921875 51.944a76.944 76.944 0 0 0-103.3921875 0L44.72 448.9278125a38.568 38.568 0 0 0 51.648 57.288l6.648-6.312V914.24a77.136 77.136 0 0 0 77.136 77.232h224.4721875v-232.224375a54.312 54.312 0 0 1 54.336-54.384h105.624375a54.312 54.312 0 0 1 54.336 54.384v232.224375h229.8a77.136 77.136 0 0 0 77.16-77.232V504.9678125c17.136 15.504 41.448 14.328 55.704-1.56a38.568 38.568 0 0 0-2.784-54.48L566.1921875 51.968Z"
        fill={getIconColor(color, 0, '#ff562a')}
      />
    </Svg>
  );
};

Iconshouye.defaultProps = {
  size: 18,
};

Iconshouye = React.memo ? React.memo(Iconshouye) : Iconshouye;

export default Iconshouye;
