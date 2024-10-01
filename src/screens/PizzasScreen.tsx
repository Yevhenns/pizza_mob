import React from 'react';

import {PagesWrapper} from '../components/PagesWrapper';
import {ProductsList} from '../components/ProductsList/ProductsList';

export function PizzasScreen() {
  return (
    <PagesWrapper>
      <ProductsList category="pizzas" />
    </PagesWrapper>
  );
}
