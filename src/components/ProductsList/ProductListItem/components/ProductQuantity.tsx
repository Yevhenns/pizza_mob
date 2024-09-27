import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {ChevronLeft} from '../../../../components/icons/ChevronLeft';
import {ChevronRight} from '../../../../components/icons/ChevronRight';
import {Checkbox} from '../../../Checkbox/Checkbox';
import {IconButton} from '../../../IconButton';

interface ProductQuantityProps {
  getTotalQuantity: (quantity: number) => void;
  handleChange: () => void;
  options?: Option[] | [];
  category: string;
}

export function ProductQuantity({
  getTotalQuantity,
  handleChange,
  options = [],
  category,
}: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    getTotalQuantity(quantity);
  }, [getTotalQuantity, quantity]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.quantitySet}>
        <IconButton
          onPress={decrement}
          disabled={quantity === 1}
          aria-label="minus">
          <ChevronLeft color={'#de612b'} />
        </IconButton>
        <Text style={styles.quantityText}>{quantity} шт.</Text>
        <IconButton onPress={increment} aria-label="plus">
          <ChevronRight color={'#de612b'} />
        </IconButton>
      </View>
      {category === 'pizzas' && options.length > 0 && (
        <Checkbox label="Опції" handleChange={handleChange} labelLeft />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
  },
  quantitySet: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});
