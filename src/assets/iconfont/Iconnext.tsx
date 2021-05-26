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

let Iconnext: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M348.16 576.8448l472.704 299.392a25.6 25.6 0 0 0 39.296-21.632V169.3952a25.6 25.6 0 0 0-39.296-21.632L348.16 447.1552V122.88H145.6128v778.24H348.16V576.8448z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconnext.defaultProps = {
  size: 18,
};

Iconnext = React.memo ? React.memo(Iconnext) : Iconnext;

export default Iconnext;
