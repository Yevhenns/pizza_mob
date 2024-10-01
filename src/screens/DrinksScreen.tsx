import React from 'react';

import {PagesWrapper} from '../components/PagesWrapper';
import {ProductsList} from '../components/ProductsList/ProductsList';

export function DrinksScreen() {
  return (
    <PagesWrapper>
      <ProductsList category="drinks" />
    </PagesWrapper>
  );
}
