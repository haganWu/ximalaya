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

let Iconbofang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 981.333333a469.333333 469.333333 0 1 1 469.333333-469.333333 469.333333 469.333333 0 0 1-469.333333 469.333333z m189.482667-507.114666L445.866667 331.946667a57.301333 57.301333 0 0 0-19.2-4.608 42.666667 42.666667 0 0 0-42.666667 42.666666v0.32l0.128 283.477334c1.493333 55.210667 44.906667 44.970667 62.784 36.266666l256-142.72a42.496 42.496 0 0 0 19.882667-35.946666 46.933333 46.933333 0 0 0-21.312-37.184z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconbofang.defaultProps = {
  size: 18,
};

Iconbofang = React.memo ? React.memo(Iconbofang) : Iconbofang;

export default Iconbofang;
