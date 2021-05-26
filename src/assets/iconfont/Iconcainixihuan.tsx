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

let Iconcainixihuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M649.6 265.6c-52.48 0-101.76 23.04-135.04 62.72-33.28-38.4-81.92-61.44-133.12-61.44-0.64 0-1.28 0-1.28 0-102.4 0-172.16 69.12-177.28 176-8.96 172.8 288.64 398.08 301.44 407.68 3.2 1.92 6.4 3.2 9.6 3.2 5.12 0 9.6-1.92 12.8-6.4 0-0.64 0.64-0.64 0.64-1.28 37.12-28.16 307.84-238.08 300.16-402.56C822.4 334.72 752.64 265.6 649.6 265.6zM512.64 816c-23.04-18.56-81.28-65.92-138.24-124.8-94.72-98.56-143.36-183.68-140.16-247.68 5.12-107.52 78.72-145.28 145.28-145.28 0.64 0 0.64 0 1.28 0 44.8 0 87.04 21.12 113.92 56.32L462.08 403.2c-5.12 7.04-3.2 17.28 4.48 22.4 7.04 5.12 17.28 3.2 22.4-4.48l36.48-54.4c1.92-1.92 3.84-4.48 4.48-7.04 27.52-39.04 71.68-62.72 119.68-62.72 67.2 0 140.8 38.4 145.92 146.56C801.28 584.96 561.28 778.24 512.64 816z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 14.08c-272.64 0-494.72 222.08-494.72 494.08s222.08 494.08 494.72 494.08c272.64 0 494.08-222.08 494.08-494.08S784.64 14.08 512 14.08zM512 971.52c-254.72 0-462.72-207.36-462.72-462.08s207.36-462.08 462.72-462.08 462.08 207.36 462.08 462.08S767.36 971.52 512 971.52z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconcainixihuan.defaultProps = {
  size: 18,
};

Iconcainixihuan = React.memo ? React.memo(Iconcainixihuan) : Iconcainixihuan;

export default Iconcainixihuan;
