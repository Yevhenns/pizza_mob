import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {Button} from '../../../Button';

type ProductFooterProps = {
  addToCart: () => void;
  promotion: boolean;
  totalPrice: number;
  totalPromPrice: number;
};

export function ProductFooter({
  promotion,
  totalPrice,
  totalPromPrice,
  addToCart,
}: ProductFooterProps) {
  return (
    <View style={styles.productFooter}>
      {promotion ? (
        <View style={styles.priceWrapper}>
          <Text style={styles.oldPrice}>{totalPrice} грн</Text>
          <Text style={styles.promPrice}>{totalPromPrice} грн</Text>
        </View>
      ) : (
        <Text style={styles.promPrice}>{totalPrice} грн</Text>
      )}
      <Button onPress={() => addToCart()}>В кошик</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  productFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  priceWrapper: {
    flexDirection: 'column',
  },
  promPrice: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
    color: '#de612b',
  },
  oldPrice: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'line-through',
  },
  inBasketContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
