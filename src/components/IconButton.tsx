import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type ButtonProps = TouchableOpacityProps;

export function IconButton({children, ...props}: ButtonProps) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}
