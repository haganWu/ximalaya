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

let IconmusicIconPause: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M317.295775 219.943662h97.352112c18.028169 0 32.450704 14.422535 32.450705 32.450704v519.211268c0 18.028169-14.422535 32.450704-32.450705 32.450704H317.295775c-18.028169 0-32.450704-14.422535-32.450705-32.450704V252.394366c0-18.028169 14.422535-32.450704 32.450705-32.450704zM609.352113 219.943662h97.352112c18.028169 0 32.450704 14.422535 32.450705 32.450704v519.211268c0 18.028169-14.422535 32.450704-32.450705 32.450704h-97.352112c-18.028169 0-32.450704-14.422535-32.450705-32.450704V252.394366c0-18.028169 14.422535-32.450704 32.450705-32.450704z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconmusicIconPause.defaultProps = {
  size: 18,
};

IconmusicIconPause = React.memo ? React.memo(IconmusicIconPause) : IconmusicIconPause;

export default IconmusicIconPause;
