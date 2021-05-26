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

let Icongengduo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M767.65184 511.86688a20.48 20.48 0 0 0-5.96992-14.52032Q550.98368 287.85664 340.38784 78.336a49.2544 49.2544 0 0 0-69.632 0.1024l-0.3072 0.29696a49.23392 49.23392 0 0 0 0.1024 69.7856L635.2384 512q-182.3744 181.48352-364.544 363.14112a49.3056 49.3056 0 0 0-0.1024 69.69344l0.69632 0.69632a49.152 49.152 0 0 0 69.6832 0.09216L761.58976 526.336a21.01248 21.01248 0 0 0 6.06208-14.46912z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icongengduo.defaultProps = {
  size: 18,
};

Icongengduo = React.memo ? React.memo(Icongengduo) : Icongengduo;

export default Icongengduo;
