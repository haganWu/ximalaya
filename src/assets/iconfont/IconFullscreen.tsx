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

let IconFullscreen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M403.2 77H120.5C96.5 77 77 96.5 77 120.5v282.8c0 24 19.5 43.5 43.5 43.5s43.5-19.5 43.5-43.5V225.4l183.9 184c17 17 44.5 17.1 61.5 0.1 8.5-8.5 12.6-19.5 12.6-30.6 0-11.1-4.5-22-13-30.5L224.8 164h178.4c24 0 43.5-19.5 43.5-43.5S427.3 77 403.2 77zM403.2 860h-177l184.6-184.6c8.5-8.5 12.5-19.8 12.5-31 0-11.1-4.3-22.3-12.8-30.8-17-17-44.6-17.1-61.6-0.1L164 798.5V620.8c0-24-19.5-43.5-43.5-43.5S77 596.7 77 620.8v282.8c0 24 19.5 43.5 43.5 43.5h282.7c24 0 43.5-19.5 43.5-43.5 0.1-24.1-19.4-43.6-43.5-43.6zM620.8 164h178.4L605.1 358.1c-17 17-17 44.5 0 61.5s44.5 17 61.5 0L860 226.2v177c0 24 19.5 43.5 43.5 43.5s43.5-19.5 43.5-43.5V120.4c0-24-19.5-43.5-43.5-43.5H620.7c-24 0-43.5 19.5-43.5 43.5s19.5 43.6 43.6 43.6zM903.5 577.2c-24 0-43.5 19.5-43.5 43.5v178.4l-195.1-195c-17-17-44.5-17-61.5 0s-17 44.5 0 61.5L797.8 860h-177c-24 0-43.5 19.5-43.5 43.5s19.5 43.5 43.5 43.5h282.8c24 0 43.5-19.5 43.5-43.5V620.7c-0.1-24-19.6-43.5-43.6-43.5z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFullscreen.defaultProps = {
  size: 18,
};

IconFullscreen = React.memo ? React.memo(IconFullscreen) : IconFullscreen;

export default IconFullscreen;
