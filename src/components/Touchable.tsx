import {rest} from 'lodash';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

// const Touchable: React.FC<TouchableOpacityProps> = props => (
//   <TouchableOpacity activeOpacity={0.8} {...props} />
// );

const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, ...rest}) => {
    const newStyle = rest.disabled ? [style, styles.disable] : style;
    return <TouchableOpacity style={newStyle} activeOpacity={0.8} {...rest} />;
  },
);
const styles = StyleSheet.create({
  disable: {
    opacity: 0.5,
  },
});
export default Touchable;
