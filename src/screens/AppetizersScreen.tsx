import React from 'react';

import {PagesWrapper} from '../components/PagesWrapper';
import {ProductsList} from '../components/ProductsList/ProductsList';

export function AppetizersScreen() {
  return (
    <PagesWrapper>
      <ProductsList category="appetizers" />
    </PagesWrapper>
  );
}
