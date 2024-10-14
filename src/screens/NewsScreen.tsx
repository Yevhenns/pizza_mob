import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../assets/styleVariables';
import {HorizontalCarousel} from '../components/HorizontalCarousel';
import {GoogleMap} from '../components/Maps';
import {PagesWrapper} from '../components/PagesWrapper';
import {ProductsList} from '../components/ProductsList/ProductsList';
import {Weather} from '../components/Weather/Weather';

export function NewsScreen() {
  return (
    <PagesWrapper>
      <HorizontalCarousel />
      <Weather />
      <Text style={styles.title}>Акційні пропозиції</Text>
      <ProductsList category="promotions" />
      <GoogleMap />
    </PagesWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.blackColor,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Comfortaa-SemiBold',
  },
});
