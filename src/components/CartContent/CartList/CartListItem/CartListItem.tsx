import React from 'react';
import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {colors} from '../../../../assets/styleVariables';
import {Remove} from '../../../../components/icons/Remove';
import {deleteItem} from '../../../../redux/cart/cartSlice';
import {useAppDispatch} from '../../../../redux/hooks';
import {IconButton} from '../../../IconButton';
import {CartListItemQuantity} from './CartListItemQuantity/CartListItemQuantity';

interface CartListItemProps {
  data: CartItem;
}

export function CartListItem({data}: CartListItemProps) {
  const {cart_id, photo, title, quantity, totalPrice, optionsTitles} = data;

  const dispatch = useAppDispatch();

  const deleteCartItem = () => {
    dispatch(deleteItem(cart_id));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainContent}>
        <Image source={{uri: photo}} width={50} height={50} />
        <Text style={styles.text}>{title}</Text>
        <CartListItemQuantity
          chosenQuantity={quantity}
          cart_id={cart_id}
          price={totalPrice}
        />
        <Text style={styles.totalPrice}>{totalPrice} грн</Text>
        <IconButton style={styles.deleteButton} onPress={deleteCartItem}>
          <Remove color={'#de612b'} />
        </IconButton>
      </View>
      {optionsTitles.length > 0 && (
        <View>
          <View>
            {optionsTitles.map(item => {
              return (
                <View key={item}>
                  <Text style={styles.text}>+ {item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: colors.accentColor,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },

  mainContent: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },

  totalPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    flexBasis: 65,
    color: colors.blackColor,
  },

  deleteButton: {
    flexBasis: 32,
  },

  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});
