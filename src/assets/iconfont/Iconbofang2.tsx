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

let Iconbofang2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M73.096777 966.963803V58.21863A60.033495 60.033495 0 0 1 165.152999 9.272731c36.472354 19.768016 690.202828 419.286182 752.716442 453.49725a54.927365 54.927365 0 0 1 0 98.475356c-45.006885 25.09298-701.363368 426.653597-754.613005 454.518476A59.741716 59.741716 0 0 1 73.096777 966.963803z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconbofang2.defaultProps = {
  size: 18,
};

Iconbofang2 = React.memo ? React.memo(Iconbofang2) : Iconbofang2;

export default Iconbofang2;
