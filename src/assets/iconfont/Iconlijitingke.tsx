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

let Iconlijitingke: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M5.248 744.128c0-32.896 4.352-61.504 13.12-85.76s24.576-47.104 47.424-68.608v308.864C42.24 877.76 26.24 855.232 17.856 830.976c-8.448-24.256-12.608-53.12-12.608-86.848zM951.104 589.76c20.16 15.488 36.48 36.864 48.96 64.128 12.48 27.264 18.688 57.344 18.688 90.24 0 33.728-4.864 62.528-14.656 86.4s-27.456 46.656-52.992 68.096V589.76z m-120.128-45.504c12.8 0 25.536 5.12 38.4 15.232 12.736 9.984 19.2 24.128 19.2 42.368v261.376c0 8.128-1.856 15.744-5.568 22.72-3.776 7.104-8.256 13.504-13.632 19.264-5.376 5.632-11.648 9.984-18.688 13.12-7.04 3.008-13.632 4.48-19.712 4.48H760.32c-17.472 0-32.192-5.376-43.968-16.128-11.84-10.88-17.664-25.28-17.664-43.52V601.856c0-18.24 6.592-32.384 19.712-42.368 13.12-10.112 27.072-15.232 41.92-15.232h70.656z m-577.408 0c19.52 0 35.392 4.736 47.424 14.144 12.16 9.472 18.176 24.256 18.176 44.48v254.4c0 20.096-5.184 36.032-15.616 47.488-10.432 11.392-24.064 17.152-40.896 17.152h-73.664c-20.16 0-35.2-6.144-44.928-18.24-9.728-12.032-14.656-26.88-14.656-44.352V602.88c0-20.224 6.016-35.008 18.176-44.48 12.096-9.344 26.624-14.144 43.392-14.144h62.592z m256.448-443.072c53.12 0 103.296 9.088 150.4 27.264 47.104 18.176 88.384 43.904 123.712 77.248s63.04 73.216 83.328 119.616c20.096 46.464 30.272 97.6 30.272 153.472h-66.624c-16.832 0-32 0.128-45.44 0.512-13.44 0.32-20.16 0.128-20.16-0.512 0-41.728-7.04-78.656-21.184-110.592-14.144-32-32.832-58.688-56.064-80.256-23.296-21.568-50.24-37.696-80.896-48.512s-63.04-16.128-97.344-16.128c-33.664 0-65.6 7.04-95.936 21.184-30.272 14.144-57.024 33.152-80.256 57.024s-41.856 51.136-56 81.792-21.184 62.4-21.184 95.424H123.392c0-55.872 10.112-107.008 30.272-153.472s47.808-86.336 82.752-119.616 76.032-59.072 123.136-77.248c47.104-18.176 97.28-27.2 150.464-27.2z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconlijitingke.defaultProps = {
  size: 18,
};

Iconlijitingke = React.memo ? React.memo(Iconlijitingke) : Iconlijitingke;

export default Iconlijitingke;
