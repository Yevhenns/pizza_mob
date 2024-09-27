import React, {PropsWithChildren, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {checkCart} from '../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getProducts} from '../redux/products/productsOperations';
import {
  getError,
  getIsLoading,
  getProductsAll,
} from '../redux/products/productsSlice';
import {Error500} from './Error500';
import Loader from './Loader';

type PagesWrapperProps = PropsWithChildren;

export function PagesWrapper({children}: PagesWrapperProps) {
  const productsAll = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsAll.length === 0 && !error) {
      dispatch(getProducts());
      return;
    }
    if (productsAll.length > 0) {
      dispatch(checkCart(productsAll));
    }
  }, [dispatch, error, productsAll]);

  if (error) {
    return <Error500 />;
  }

  return (
    <View style={styles.wrapper}>
      <>
        {isLoading && <Loader />}
        <ScrollView contentContainerStyle={styles.childrenWrapper}>
          {children}
        </ScrollView>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },

  childrenWrapper: {
    rowGap: 20,
  },
});
