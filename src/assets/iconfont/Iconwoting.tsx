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

let Iconwoting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1.6 592.1v-158c1.6-5.8 3.5-11.6 4.7-17.5 24.4-127.5 88.4-230.8 190.4-310.5C296.5 28.2 409.8-3.9 536.3 1c156.8 6.1 280.9 73.2 379.1 192.1 57.9 70.1 90.4 152.2 107 241v158c-1.4 4.8-3.4 9.6-4.3 14.5-23.6 128.9-88.4 232.7-190.8 313.7-69.7 55.1-149.6 86.9-236.3 103.2H433c-3.8-1.3-7.5-3.2-11.4-3.9-130.3-22.8-235-88-316.7-191.2C49.7 758.8 18 678.8 1.6 592.1z m509.6-317.2c127-0.2 224.7 101.1 221.1 227.8-0.7 22.8-7 31.9-31.9 31.3-45.2-1-54.9 10-60.4 56.5-4 34.2-7.1 68.5-13.1 102.3-4.2 23.9 6 35.8 25.9 44.7 40.5 18.1 78.4 11.6 110.6-16.1 32-27.6 47.4-65.1 33.4-106.5-11.8-34.7-13.6-69.2-12.7-104.6 0.6-23.5-2.9-46.5-7.1-69.4C754.1 316.5 637.5 221.6 509.6 223c-127.5 1.3-240.5 96-263.3 219.4-11.7 63.4-3.1 128.4-21.9 192.1-10.4 35.4 11.3 71.2 44.3 93.4 33.6 22.6 69.4 26.1 106.4 7.5 15.9-8 25.4-18.1 22.2-38.1-5.6-36-9.4-72.2-13.6-108.4-5.3-45.2-15.1-55.8-61.8-55-23.5 0.4-29.4-8.4-30.3-29.8-4.7-126.1 93.2-229 219.6-229.2z"
        fill={getIconColor(color, 0, '#ff562a')}
      />
    </Svg>
  );
};

Iconwoting.defaultProps = {
  size: 18,
};

Iconwoting = React.memo ? React.memo(Iconwoting) : Iconwoting;

export default Iconwoting;
