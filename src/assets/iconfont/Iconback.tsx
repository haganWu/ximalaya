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

let Iconback: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M50.17600004 461.824c12.8 0 25.6 5.12 35.84000002 14.848l415.74399998 411.64800001c19.968 19.968 19.968 51.712 0.512 71.67999999s-51.712 19.968-71.68 0.51199999l-415.744-411.64799999a50.8416 50.8416 0 0 1-0.51199999-71.68c9.216-10.75200001 22.528-15.36 35.83999999-15.36z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M461.31200005 46.08c12.8 0 25.6 5.12 35.83999999 14.848 19.968 19.968 19.968 51.712 0.512 71.68l-411.64800002 415.744a50.8416 50.8416 0 0 1-71.67999998 0.512 50.8416 50.8416 0 0 1-0.512-71.67999999L425.47200004 61.43999999c9.728-10.24 23.04-15.36 35.84000001-15.35999999z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconback.defaultProps = {
  size: 18,
};

Iconback = React.memo ? React.memo(Iconback) : Iconback;

export default Iconback;
