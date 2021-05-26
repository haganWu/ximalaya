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

let Iconstop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M735.744 49.664c-51.2 0-96.256 44.544-96.256 95.744v733.184c0 51.2 45.056 95.744 96.256 95.744s96.256-44.544 96.256-95.744V145.408c0-51.2-45.056-95.744-96.256-95.744z m-447.488 0c-51.2 0-96.256 44.544-96.256 95.744v733.184c0 51.2 45.056 95.744 96.256 95.744S384 929.792 384 878.592V145.408c0-51.2-44.544-95.744-95.744-95.744z"
        fill={getIconColor(color, 0, '#606060')}
      />
    </Svg>
  );
};

Iconstop.defaultProps = {
  size: 18,
};

Iconstop = React.memo ? React.memo(Iconstop) : Iconstop;

export default Iconstop;
