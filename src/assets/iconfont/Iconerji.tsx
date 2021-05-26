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

let Iconerji: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M158.334633 734.822878l-87.167269 11.038404c-1.086751-9.036817-36.604686-309.759903 120.598682-487.382323 66.319451-74.841545 166.813237-127.876436 318.640154-127.876436 156.37449 0 258.583336 54.250578 325.102333 130.49303 155.059542 177.894619 115.364471 475.67263 114.165156 484.309334l-86.9974-11.955286c0.342808-2.687202 35.06154-267.291672-93.400227-414.613996-58.856479-67.535139-143.562696-100.351546-258.870886-100.351546-111.618147 0-194.3238 32.144094-252.836449 98.219999-130.636293 147.566894-99.578949 415.31496-99.235119 417.832294L158.33361 734.822878"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M803.881209 891.99964 686.686043 891.99964 686.686043 569.868989l117.195166 0L803.881209 891.99964 803.881209 891.99964 803.881209 891.99964zM335.300091 891.99964 218.191906 891.99964 218.191906 569.868989 335.300091 569.868989 335.300091 891.99964 335.300091 891.99964 335.300091 891.99964z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconerji.defaultProps = {
  size: 18,
};

Iconerji = React.memo ? React.memo(Iconerji) : Iconerji;

export default Iconerji;
