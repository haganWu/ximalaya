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

let IconfavoritesFill: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M800.76 266.56c-81.79-76.68-204.48-81.79-286.27-5.11-86.9-76.68-209.59-71.57-291.38 5.11-81.79 81.79-81.79 209.59 0 291.38L463.37 798.2c25.56 25.56 66.46 25.56 92.01 0l240.26-240.26c86.91-76.68 86.91-209.59 5.12-291.38z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconfavoritesFill.defaultProps = {
  size: 18,
};

IconfavoritesFill = React.memo ? React.memo(IconfavoritesFill) : IconfavoritesFill;

export default IconfavoritesFill;
