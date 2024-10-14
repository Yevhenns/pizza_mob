import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../assets/styleVariables';

export function Error500() {
  return (
    <View style={styles.modal}>
      <Text style={styles.text}>Щось пішло не так!</Text>
      <Text style={styles.text}>Будь ласка завітайте пізніше</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.blackColor,
  },
});
