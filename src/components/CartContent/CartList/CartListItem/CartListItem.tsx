import React from 'react';
import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {Remove} from '../../../../components/icons/Remove';
import {IconButton} from '../../../IconButton';
import {CartListItemQuantity} from './CartListItemQuantity/CartListItemQuantity';

interface CartListItemProps {
  data: CartItem;
  deleteCartItem: (cart_id: string) => void;
}

export function CartListItem({data, deleteCartItem}: CartListItemProps) {
  const {cart_id, photo, title, quantity, totalPrice, optionsTitles} = data;

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
        <IconButton
          style={styles.deleteButton}
          onPress={() => deleteCartItem(cart_id)}>
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
    borderColor: '#de612b',
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
    color: '#000000',
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
