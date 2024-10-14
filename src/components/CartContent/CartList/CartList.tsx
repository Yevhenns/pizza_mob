import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {colors} from '../../../assets/styleVariables';
import {
  addOrderSum,
  deleteAllItems,
  getFilteredCart,
} from '../../../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Button} from '../../Button';
import {CartListItem} from './CartListItem/CartListItem';

interface CartListProps {}

export function CartList({}: CartListProps) {
  const [sum, setSum] = useState(0);

  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
  };

  useEffect(() => {
    const totalSum = filteredCart.reduce(
      (acc, item) => acc + item.totalPrice,
      0,
    );
    setSum(totalSum);
    dispatch(addOrderSum(sum));
  }, [dispatch, sum, filteredCart]);

  return (
    <View style={styles.cartList}>
      {filteredCart.map(data => {
        return <CartListItem key={data.cart_id} data={data} />;
      })}
      <Text style={styles.totalPayment}>До сплати: {sum} грн</Text>
      <Button onPress={deleteAllProducts}>Очистити кошик</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cartList: {
    display: 'flex',
    gap: 5,
    marginBottom: 20,
  },

  totalPayment: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.blackColor,
  },
});
