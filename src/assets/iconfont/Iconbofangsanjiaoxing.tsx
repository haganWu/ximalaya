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

let Iconbofangsanjiaoxing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M803.84 492.032L213.056 135.04c-17.664-10.752-38.848-10.752-56.704-0.064C138.624 145.728 128 164.928 128 186.368v714.176c0 21.44 10.624 40.704 28.352 51.392 8.896 5.376 18.624 8.064 28.352 8.064 9.728 0 19.52-2.688 28.352-8.064l590.72-356.992c17.728-10.752 28.288-30.016 28.288-51.456 0.064-21.504-10.496-40.768-28.224-51.456z m-614.272 399.68l-2.432-697.92L765.76 543.488 189.568 891.712z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconbofangsanjiaoxing.defaultProps = {
  size: 18,
};

Iconbofangsanjiaoxing = React.memo ? React.memo(Iconbofangsanjiaoxing) : Iconbofangsanjiaoxing;

export default Iconbofangsanjiaoxing;
