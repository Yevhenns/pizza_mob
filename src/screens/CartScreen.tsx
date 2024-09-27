import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';

import {CartContent} from '../components/CartContent/CartContent';
import {Empty} from '../components/Empty';
import {FinalModal} from '../components/FinalModal';
import {PagesWrapper} from '../components/PagesWrapper';
import {deleteAllItems, getFilteredCart} from '../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

export function CartScreen() {
  const [open, setOpen] = useState(false);

  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    setOpen(false);
  };

  if (filteredCart.length === 0) {
    return <Empty />;
  }

  return (
    <PagesWrapper>
      <View>
        <CartContent
          deleteAllProducts={deleteAllProducts}
          openModal={openModal}
        />
        {open && <FinalModal finalAction={deleteAllProducts} />}
      </View>
    </PagesWrapper>
  );
}
