import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {addOrderSum, getFilteredCart} from '../../../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Button} from '../../Button';
import {CartListItem} from './CartListItem/CartListItem';

interface CartListProps {
  deleteCartItem: (cart_id: string) => void;
  deleteAllProducts: () => void;
}

export function CartList({deleteCartItem, deleteAllProducts}: CartListProps) {
  const [sum, setSum] = useState(0);

  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

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
        return (
          <CartListItem
            key={data.cart_id}
            deleteCartItem={deleteCartItem}
            data={data}
          />
        );
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
    color: '#000000',
  },
});
