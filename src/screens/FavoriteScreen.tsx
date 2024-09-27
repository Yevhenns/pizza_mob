import React from 'react';

import {Empty} from '../components/Empty';
import {PagesWrapper} from '../components/PagesWrapper';
import {ProductsList} from '../components/ProductsList/ProductsList';
import {useAppSelector} from '../redux/hooks';
import {getFavorites} from '../redux/products/productsSlice';

export function FavoriteScreen() {
  const favoriteProducts = useAppSelector(getFavorites);

  if (favoriteProducts.length === 0) {
    return <Empty />;
  }

  return (
    <PagesWrapper>
      <ProductsList category="favorites" />
    </PagesWrapper>
  );
}
