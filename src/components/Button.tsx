import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {StyleSheet} from 'react-native';

import {colors} from '../assets/styleVariables';

type ButtonProps = TouchableOpacityProps;

export function Button({children, ...props}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.accentColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.whiteColor,
    fontSize: 20,
    fontFamily: 'Comfortaa-Bold',
  },
});
