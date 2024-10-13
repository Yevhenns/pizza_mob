import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {ChevronLeft} from '../../../../../components/icons/ChevronLeft';
import {ChevronRight} from '../../../../../components/icons/ChevronRight';
import {setQuantityAndPrice} from '../../../../../redux/cart/cartSlice';
import {useAppDispatch} from '../../../../../redux/hooks';
import {IconButton} from '../../../../IconButton';

interface CartListItemQuantityProps {
  chosenQuantity: number;
  cart_id: string;
  price: number;
}

export function CartListItemQuantity({
  chosenQuantity,
  cart_id,
  price,
}: CartListItemQuantityProps) {
  const [quantity, setQuantity] = useState(chosenQuantity);

  const dispatch = useAppDispatch();

  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => prevQuantity - 1);

  useEffect(() => {
    setQuantity(chosenQuantity);
  }, [chosenQuantity]);

  useEffect(() => {
    const totalPrice = quantity * (price / chosenQuantity);
    dispatch(setQuantityAndPrice({cart_id, quantity, totalPrice}));
  }, [cart_id, chosenQuantity, dispatch, price, quantity]);

  return (
    <View style={styles.wrapper}>
      <IconButton
        onPress={decrement}
        disabled={quantity === 1}
        aria-label="minus">
        <ChevronLeft color="#de612b" />
      </IconButton>
      <Text style={styles.text}>{chosenQuantity}</Text>
      <IconButton onPress={increment} aria-label="plus">
        <ChevronRight color="#de612b" />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginLeft: 'auto',
  },

  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});
