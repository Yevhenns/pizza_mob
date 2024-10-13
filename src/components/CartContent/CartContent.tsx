import React from 'react';
import {View} from 'react-native';

import {getFilteredCart, getIsLoading} from '../../redux/cart/cartSlice';
import {useAppSelector} from '../../redux/hooks';
import {Loader} from '../Loader';
import {CartForm} from './CartForm/CartForm';
import {CartList} from './CartList/CartList';

interface CartContentProps {
  openModal: () => void;
}

export function CartContent({openModal}: CartContentProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const isLoading = useAppSelector(getIsLoading);

  const order: Ordered[] = filteredCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
      optionsTitles: item.optionsTitles,
    };
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <CartList />
      <CartForm openModal={openModal} order={order} />
    </View>
  );
}
