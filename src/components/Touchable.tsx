import {rest} from 'lodash';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import _ from 'lodash';
import {useCallback} from 'react';
// const Touchable: React.FC<TouchableOpacityProps> = props => (
//   <TouchableOpacity activeOpacity={0.8} {...props} />
// );

const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, onPress = () => {}, ...rest}) => {
    const newStyle = rest.disabled ? [style, styles.disable] : style;
    let throttleOnPress  = useCallback(
      _.throttle(onPress, 1000, {
        leading: true,
        trailing: false,
      }),
      [onPress],
    );
    return (
      <TouchableOpacity
        onPress={throttleOnPress}
        style={newStyle}
        activeOpacity={0.8}
        {...rest}
      />
    );
  },
);
const styles = StyleSheet.create({
  disable: {
    opacity: 0.5,
  },
});
export default Touchable;
