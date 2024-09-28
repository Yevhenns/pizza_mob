import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {PagesWrapper} from '../components/PagesWrapper';

export function LoginScreen() {
  return (
    <PagesWrapper>
      <Text style={styles.title}>Логін</Text>
    </PagesWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Comfortaa-SemiBold',
  },
});
