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

let Iconshijian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.976 0C228.864 0 0 228.864 0 511.488s228.864 511.488 511.488 511.488 511.488-228.864 511.488-511.488S793.6 0 510.976 0z m0 954.88c-244.736-4.096-439.808-206.336-435.712-451.072 4.608-239.104 197.12-431.616 435.712-435.712 244.736 4.096 439.808 206.336 435.712 451.072-4.096 239.104-196.608 431.616-435.712 435.712z m222.208-409.088H510.976V324.096c0-9.216-7.68-16.896-16.896-16.896h-34.304c-9.216 0-16.896 7.68-16.896 16.896v272.896c0 9.216 7.68 16.896 16.896 16.896h272.896c9.216 0 16.896-7.68 16.896-16.896v-34.304c0.512-9.216-7.168-16.896-16.384-16.896z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconshijian.defaultProps = {
  size: 18,
};

Iconshijian = React.memo ? React.memo(Iconshijian) : Iconshijian;

export default Iconshijian;
