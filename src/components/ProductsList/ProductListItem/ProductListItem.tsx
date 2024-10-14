import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

import {options} from '../../../assets/options';
import {colors} from '../../../assets/styleVariables';
import {addItem} from '../../../redux/cart/cartSlice';
import {useAppDispatch} from '../../../redux/hooks';
import {ProductDescription} from './components/ProductDescription';
import {ProductFooter} from './components/ProductFooter';
import {ProductOptionsList} from './components/ProductOptionsList';
import {ProductQuantity} from './components/ProductQuantity';

interface ProductListItemProps {
  item: Product;
}

export function ProductListItem({item}: ProductListItemProps) {
  const {price, promotion, promPrice, category, vegan} = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [optionsShown, setOptionsShown] = useState(false);
  const [optionsArray, setOptionsArray] = useState<Option[]>([]);
  const [optionsSum, setOptionsSum] = useState(0);

  const dispatch = useAppDispatch();

  const getTotalQuantity = (quantity: number) => {
    setTotalQuantity(quantity);
    setTotalPrice((price + optionsSum) * quantity);
    setTotalPromPrice((promPrice + optionsSum) * quantity);
  };

  const optionsTitles = optionsArray.map(option => option.title);

  const addToCart = () => {
    const {photo, title, _id} = item;
    const cartItem = {
      _id: _id,
      photo: photo,
      title: title,
      quantity: totalQuantity,
      optionsTitles: optionsTitles,
      totalPrice: promotion ? totalPromPrice : totalPrice,
    };
    dispatch(addItem(cartItem));
    Toast.show({
      type: 'success',
      text1: 'Додано до кошика',
      visibilityTime: 1500,
    });
  };

  const handleShowOptions = () => {
    setOptionsShown(!optionsShown);
  };

  const handleChooseOptions = (title: string, isChecked: boolean) => {
    const optionData = options.find(option => option.title === title);

    if (optionData !== undefined) {
      if (isChecked && !optionsArray.includes(optionData)) {
        setOptionsArray([...optionsArray, optionData]);
        setOptionsSum(optionsSum + optionData.price);
      }
      if (!isChecked && optionsArray.includes(optionData)) {
        const filteredArray = optionsArray.filter(
          optionsArrayItem => optionsArrayItem !== optionData,
        );
        setOptionsArray(filteredArray);
        setOptionsSum(optionsSum - optionData.price);
      }
    }
  };

  useEffect(() => {
    !optionsShown && setOptionsArray([]);
    setOptionsSum(0);
  }, [optionsShown]);

  return (
    <View style={styles.listItem}>
      <ProductDescription item={item} />
      <ProductQuantity
        getTotalQuantity={getTotalQuantity}
        handleChange={handleShowOptions}
        options={options}
        category={category}
      />
      {optionsShown && (
        <ProductOptionsList
          options={options}
          handleChange={handleChooseOptions}
          vegan={vegan}
        />
      )}
      <ProductFooter
        promotion={promotion}
        totalPrice={totalPrice}
        totalPromPrice={totalPromPrice}
        addToCart={addToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    color: colors.blackColor,
    padding: 24,
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
