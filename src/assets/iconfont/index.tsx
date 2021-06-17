/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IcontrashGray from './IcontrashGray';
import Iconbofang2 from './Iconbofang2';
import Iconxuxian from './Iconxuxian';
import Iconerji from './Iconerji';
import Iconcainixihuan from './Iconcainixihuan';
import IconFullscreen from './IconFullscreen';
import IconvolumeOff from './IconvolumeOff';
import IconmusicIconPause from './IconmusicIconPause';
import Iconxia from './Iconxia';
import Iconbofang from './Iconbofang';
import Iconbofangsanjiaoxing from './Iconbofangsanjiaoxing';
import Iconbofang1 from './Iconbofang1';
import Iconnext from './Iconnext';
import Iconxiayishou from './Iconxiayishou';
import IconroundPlayArrowP from './IconroundPlayArrowP';
import Icongerenzhanghaoguanli from './Icongerenzhanghaoguanli';
import IconVolumeUp from './IconVolumeUp';
import Iconshengyin from './Iconshengyin';
import Iconlijitingke from './Iconlijitingke';
import Iconhuanyipi from './Iconhuanyipi';
import Iconback from './Iconback';
import IconfavoritesFill from './IconfavoritesFill';
import Iconstop from './Iconstop';
import Iconshijian from './Iconshijian';
import Iconmore from './Iconmore';
import Iconmessage2 from './Iconmessage2';
import Iconxihuan from './Iconxihuan';
import Iconwoting from './Iconwoting';
import Iconshouye from './Iconshouye';
import Iconzhanghu from './Iconzhanghu';
import Iconfaxian from './Iconfaxian';

export type IconNames = 'icontrash-gray' | 'iconbofang2' | 'iconxuxian' | 'iconerji' | 'iconcainixihuan' | 'iconFullscreen' | 'iconvolume_off' | 'iconmusic-icon_pause' | 'iconxia' | 'iconbofang' | 'iconbofangsanjiaoxing' | 'iconbofang1' | 'iconnext' | 'iconxiayishou' | 'iconround-play_arrow-p' | 'icongerenzhanghaoguanli' | 'iconVolumeUp' | 'iconshengyin' | 'iconlijitingke' | 'iconhuanyipi' | 'iconback' | 'iconfavorites-fill' | 'iconstop' | 'iconshijian' | 'iconmore' | 'iconmessage2' | 'iconxihuan' | 'iconwoting' | 'iconshouye' | 'iconzhanghu' | 'iconfaxian';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icontrash-gray':
      return <IcontrashGray key="1" {...rest} />;
    case 'iconbofang2':
      return <Iconbofang2 key="2" {...rest} />;
    case 'iconxuxian':
      return <Iconxuxian key="3" {...rest} />;
    case 'iconerji':
      return <Iconerji key="4" {...rest} />;
    case 'iconcainixihuan':
      return <Iconcainixihuan key="5" {...rest} />;
    case 'iconFullscreen':
      return <IconFullscreen key="6" {...rest} />;
    case 'iconvolume_off':
      return <IconvolumeOff key="7" {...rest} />;
    case 'iconmusic-icon_pause':
      return <IconmusicIconPause key="8" {...rest} />;
    case 'iconxia':
      return <Iconxia key="9" {...rest} />;
    case 'iconbofang':
      return <Iconbofang key="10" {...rest} />;
    case 'iconbofangsanjiaoxing':
      return <Iconbofangsanjiaoxing key="11" {...rest} />;
    case 'iconbofang1':
      return <Iconbofang1 key="12" {...rest} />;
    case 'iconnext':
      return <Iconnext key="13" {...rest} />;
    case 'iconxiayishou':
      return <Iconxiayishou key="14" {...rest} />;
    case 'iconround-play_arrow-p':
      return <IconroundPlayArrowP key="15" {...rest} />;
    case 'icongerenzhanghaoguanli':
      return <Icongerenzhanghaoguanli key="16" {...rest} />;
    case 'iconVolumeUp':
      return <IconVolumeUp key="17" {...rest} />;
    case 'iconshengyin':
      return <Iconshengyin key="18" {...rest} />;
    case 'iconlijitingke':
      return <Iconlijitingke key="19" {...rest} />;
    case 'iconhuanyipi':
      return <Iconhuanyipi key="20" {...rest} />;
    case 'iconback':
      return <Iconback key="21" {...rest} />;
    case 'iconfavorites-fill':
      return <IconfavoritesFill key="22" {...rest} />;
    case 'iconstop':
      return <Iconstop key="23" {...rest} />;
    case 'iconshijian':
      return <Iconshijian key="24" {...rest} />;
    case 'iconmore':
      return <Iconmore key="25" {...rest} />;
    case 'iconmessage2':
      return <Iconmessage2 key="26" {...rest} />;
    case 'iconxihuan':
      return <Iconxihuan key="27" {...rest} />;
    case 'iconwoting':
      return <Iconwoting key="28" {...rest} />;
    case 'iconshouye':
      return <Iconshouye key="29" {...rest} />;
    case 'iconzhanghu':
      return <Iconzhanghu key="30" {...rest} />;
    case 'iconfaxian':
      return <Iconfaxian key="31" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
