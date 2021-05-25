/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Iconwoting from './Iconwoting';
import Iconshouye from './Iconshouye';
import Iconzhanghu from './Iconzhanghu';
import Iconfaxian from './Iconfaxian';

export type IconNames = 'iconwoting' | 'iconshouye' | 'iconzhanghu' | 'iconfaxian';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconwoting':
      return <Iconwoting key="1" {...rest} />;
    case 'iconshouye':
      return <Iconshouye key="2" {...rest} />;
    case 'iconzhanghu':
      return <Iconzhanghu key="3" {...rest} />;
    case 'iconfaxian':
      return <Iconfaxian key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
