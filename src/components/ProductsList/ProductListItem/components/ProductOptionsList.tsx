import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CheckboxOption} from '../../../Checkbox/CheckboxOption';

type ProductOptionsListProps = {
  options: Option[];
  handleChange: (title: string, isChecked: boolean) => void;
  vegan: boolean;
};

export function ProductOptionsList({
  options,
  handleChange,
  vegan,
}: ProductOptionsListProps) {
  const [filteredByVegan, setFilteredByVegan] = useState<Option[]>([]);

  useEffect(() => {
    if (!vegan) {
      setFilteredByVegan(options);
    } else {
      const filteredArray = options.filter(item => item.vegan === vegan);
      setFilteredByVegan(filteredArray);
    }
  }, [options, vegan]);

  return (
    <View style={styles.wrapper}>
      {filteredByVegan.map(item => {
        return (
          <View key={item.id} style={styles.productItem}>
            <CheckboxOption title={item.title} handleChange={handleChange} />
            <Text style={styles.optionPrice}>+ {item.price} грн</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 6,
  },

  productItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
});
