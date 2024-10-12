import React from 'react';
import {View} from 'react-native';

import {
  deleteItem,
  getFilteredCart,
  getIsLoading,
} from '../../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Loader from '../Loader';
import {CartForm} from './CartForm/CartForm';
import {CartList} from './CartList/CartList';

interface CartContentProps {
  deleteAllProducts: () => void;
  openModal: () => void;
}

export function CartContent({deleteAllProducts, openModal}: CartContentProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const isLoading = useAppSelector(getIsLoading);

  const dispatch = useAppDispatch();

  const order: Ordered[] = filteredCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
      optionsTitles: item.optionsTitles,
    };
  });

  const deleteCartItem = (cart_id: string) => {
    dispatch(deleteItem(cart_id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <CartList
        deleteCartItem={deleteCartItem}
        deleteAllProducts={deleteAllProducts}
      />
      <CartForm openModal={openModal} order={order} />
    </View>
  );
}
