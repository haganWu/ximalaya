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

let Iconzhanghu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M509.423 592.804h-5.587 11.174-5.587z m134.098-36.319c78.223-44.699 131.304-131.304 131.304-229.083C774.825 182.129 654.695 62 509.423 62S244.021 182.13 244.021 327.402c0 97.78 53.08 184.384 131.304 229.083-164.828 53.08-290.545 195.56-312.894 374.357-2.794 16.762 8.38 27.937 25.143 30.73 13.968 2.794 27.937-8.38 30.73-25.143 25.144-195.56 189.972-343.625 385.532-343.625h11.174c195.56 2.793 360.388 150.86 385.531 343.625 2.794 13.968 13.969 25.143 27.937 25.143h2.794c16.762-2.793 25.143-16.762 25.143-30.73-22.35-178.797-148.066-321.276-312.894-374.357zM512.217 536.93h-5.588c-114.541-2.793-206.734-94.985-206.734-209.527s94.986-209.528 209.528-209.528 209.528 94.986 209.528 209.528-92.192 206.734-206.734 209.527z"
        fill={getIconColor(color, 0, '#ff562a')}
      />
      <Path
        d="M512.247 540.364h-6.358 6.358z"
        fill={getIconColor(color, 1, '#ff562a')}
      />
    </Svg>
  );
};

Iconzhanghu.defaultProps = {
  size: 18,
};

Iconzhanghu = React.memo ? React.memo(Iconzhanghu) : Iconzhanghu;

export default Iconzhanghu;
