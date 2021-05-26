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

let Iconxiayishou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M675.83999999 447.1552l-472.70399999-299.392a25.6 25.6 0 0 0-39.296 21.632L163.84 854.6048a25.6 25.6 0 0 0 39.296 21.632L675.83999999 576.8448 675.83999999 901.12 878.3872 901.12000001l0-778.24000002L675.83999999 122.88 675.83999999 447.1552z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconxiayishou.defaultProps = {
  size: 18,
};

Iconxiayishou = React.memo ? React.memo(Iconxiayishou) : Iconxiayishou;

export default Iconxiayishou;
