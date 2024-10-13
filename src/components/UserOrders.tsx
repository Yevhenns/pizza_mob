import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {SignInResponse} from '@react-native-google-signin/google-signin';

import {formattedDate} from '../helpers/formattedDate';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getUserProducts} from '../redux/userOrders/userOrdersOperations';
import {getUserProductsAll} from '../redux/userOrders/userOrdersSlice';
import {Button} from './Button';

type UserOrdersProps = {
  logoutHandler: () => void;
  userInfo: SignInResponse;
};

export function UserOrders({logoutHandler, userInfo}: UserOrdersProps) {
  const userOrders = useAppSelector(getUserProductsAll);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo.data?.user.id) {
      dispatch(getUserProducts(userInfo.data?.user.id));
    }
  }, [dispatch, userInfo.data?.user.id, userOrders]);

  return (
    <View style={styles.userInfoWrapper}>
      <Text style={styles.heading}>Привіт, {userInfo.data?.user.name}!</Text>
      <Button onPress={logoutHandler}>Вийти</Button>
      {userOrders.length === 0 ? (
        <Text style={styles.text}>Список замовлень порожній</Text>
      ) : (
        <View style={styles.orderWrapper}>
          <Text style={styles.heading}>Список замовлень</Text>
          <FlatList
            data={userOrders}
            renderItem={({item}) => (
              <View key={item._id} style={styles.order}>
                <Text style={styles.text}>{formattedDate(item.createdAt)}</Text>
                {item.order.map(order => (
                  <View key={order._id}>
                    <View style={styles.titleQuantity}>
                      <Text style={styles.text}>{order.title}</Text>
                      <Text style={styles.text}>{order.quantity} шт.</Text>
                    </View>
                    <View style={styles.optionsWrapper}>
                      {order.optionsTitles.length > 0 &&
                        order.optionsTitles.map(opt => (
                          <Text style={styles.text} key={opt}>
                            {opt}
                          </Text>
                        ))}
                    </View>
                  </View>
                ))}
                <Text style={styles.text}>
                  Загальна сума: {item.orderSum} грн.
                </Text>
              </View>
            )}
            keyExtractor={item => item._id}
          />
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
    flex: 1,
  },

  heading: {
    fontSize: 24,
  },

  text: {
    fontSize: 20,
  },

  orderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
  },

  order: {
    borderBottomWidth: 1,
    borderColor: 'tomato',
    borderRadius: 10,
    padding: 5,
  },

  titleQuantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  optionsWrapper: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});
