import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {SignInResponse} from '@react-native-google-signin/google-signin';

import {formattedDate} from '../helpers/formattedDate';
import {Button} from './Button';

type UserOrdersProps = {
  logoutHandler: () => void;
  userInfo: SignInResponse;
  userOrders: UserOrders[];
};

export function UserOrders({
  logoutHandler,
  userInfo,
  userOrders,
}: UserOrdersProps) {
  return (
    <View style={styles.userInfoWrapper}>
      <Text style={styles.heading}>Привіт, {userInfo.data?.user.name}!</Text>
      <Button onPress={logoutHandler}>Вийти</Button>
      {userOrders.length === 0 ? (
        <Text>Список замовлень порожній</Text>
      ) : (
        <View style={styles.orderWrapper}>
          <Text>Список замовлень</Text>
          {userOrders.map(item => (
            <View key={item._id} style={styles.order}>
              <Text>{formattedDate(item.createdAt)}</Text>
              {item.order.map(order => (
                <View key={order._id}>
                  <View style={styles.titleQuantity}>
                    <Text>{order.title}</Text>
                    <Text>{order.quantity} шт.</Text>
                  </View>
                  <View style={styles.optionsWrapper}>
                    {order.optionsTitles.length > 0 &&
                      order.optionsTitles.map(opt => (
                        <Text key={opt}>{opt}</Text>
                      ))}
                  </View>
                </View>
              ))}
              <Text>Загальна сума: {item.orderSum} грн.</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  heading: {
    fontSize: 24,
  },

  orderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  order: {
    borderBottomWidth: 1,
    borderColor: 'tomato',
    borderRadius: 10,
    padding: 5,
  },

  titleQuantity: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  optionsWrapper: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});
