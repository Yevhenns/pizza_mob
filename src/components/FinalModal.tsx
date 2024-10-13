import React from 'react';
import {Modal, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {
  getError,
  getFilteredCart,
  getIsLoading,
  getOrderSum,
} from '../redux/cart/cartSlice';
import {useAppSelector} from '../redux/hooks';
import {Button} from './Button';
import {Error500} from './Error500';
import {Loader} from './Loader';

interface FinalModalProps {
  finalAction: () => void;
}

export function FinalModal({finalAction}: FinalModalProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const sum = useAppSelector(getOrderSum);
  const isLoading = useAppSelector(getIsLoading);
  const err = useAppSelector(getError);

  if (err) {
    return <Error500 />;
  }

  return (
    <Modal style={styles.modalWrapper}>
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      ) : (
        <View style={styles.modal}>
          <View style={styles.resultTextWrapper}>
            <Text style={styles.text}>Дякуємо!</Text>
            <Text style={styles.text}>Ваше замовлення прийняте,</Text>
            <Text style={styles.text}>очікуйте дзвінок від менеджера</Text>
            <Text style={styles.text}>Інформація про замовлення:</Text>
          </View>
          <View>
            {filteredCart.map(
              ({cart_id, title, quantity, totalPrice, optionsTitles}) => {
                return (
                  <View key={cart_id}>
                    <Text style={styles.text}>
                      {title} - {quantity} шт. - {totalPrice} грн.
                    </Text>
                    {optionsTitles.map(item => {
                      return (
                        <Text key={item} style={styles.text}>
                          + {item}
                        </Text>
                      );
                    })}
                  </View>
                );
              },
            )}
          </View>
          <View>
            <Text style={styles.text}>Загальна сума: {sum} грн.</Text>
          </View>
          <Button onPress={finalAction}>
            <Text style={styles.buttonText}>Вийти</Text>
          </Button>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
  },

  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  modal: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  resultTextWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  text: {
    color: '#000000',
    fontSize: 16,
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
