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

let Iconxihuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 853.6c-23.1 0-44.8-9.1-61.1-25.5L198.1 572.4c-51.6-52.2-75.7-124.4-66-197.9 9.7-73.1 52-136.5 116.2-173.9 82.5-48.1 187.2-37.6 263.6 23.9 76.5-61.5 181.2-72 263.7-23.9 64.2 37.5 106.6 100.9 116.2 173.9 9.7 73.6-14.3 145.7-66 197.9L573.1 828.1c-16.3 16.5-38 25.5-61.1 25.5zM360.9 234.4c-27.9 0-55.5 7-80.3 21.5-47 27.4-78 73.7-85.1 127-7.1 53.8 10.4 106.5 48 144.6l252.8 255.7c4.2 4.3 9.6 6.5 15.6 6.5s11.4-2.2 15.6-6.5l252.9-255.7c37.6-38.1 55.1-90.7 48-144.6-7.1-53.3-38.1-99.6-85-127-65.2-38.1-150.5-24.5-207.4 33l-24 24.3-24-24.2c-35.3-35.9-81.5-54.6-127.1-54.6z"
        fill={getIconColor(color, 0, '#f86442')}
      />
      <Path
        d="M384.4 296.1c-20.4 0-40.5 5.1-58.5 15.6-34.7 20.3-57.6 54.4-62.8 93.7-5.2 39.7 7.6 78.6 35.4 106.7L512 727.9 725.5 512c27.7-28 40.6-66.9 35.4-106.6-5.2-39.3-28.1-73.5-62.8-93.7-47.8-27.9-110.6-17.7-152.7 24.9L528.2 354c-8.5 8.6-23.8 8.6-32.3 0l-17.2-17.4c-26.3-26.6-60.6-40.5-94.3-40.5z"
        fill={getIconColor(color, 1, '#f86442')}
      />
      <Path
        d="M784 531h0.1-0.1z"
        fill={getIconColor(color, 2, '#f86442')}
      />
    </Svg>
  );
};

Iconxihuan.defaultProps = {
  size: 18,
};

Iconxihuan = React.memo ? React.memo(Iconxihuan) : Iconxihuan;

export default Iconxihuan;
