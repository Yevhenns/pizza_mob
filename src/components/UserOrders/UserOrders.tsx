import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';

import {SignInResponse} from '@react-native-google-signin/google-signin';

import {formattedDate} from '../../helpers/formattedDate';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getUserProducts} from '../../redux/userOrders/userOrdersOperations';
import {
  getIsLoading,
  getUserProductsAll,
} from '../../redux/userOrders/userOrdersSlice';
import {Button} from '../Button';
import {Loader} from '../Loader';
import {styles} from './UserOrders.styles.ts';

type UserOrdersProps = {
  logoutHandler: () => void;
  userInfo: SignInResponse;
};

export function UserOrders({logoutHandler, userInfo}: UserOrdersProps) {
  const [refreshing, setRefreshing] = useState(false);

  const userOrders = useAppSelector(getUserProductsAll);
  const isLoading = useAppSelector(getIsLoading);

  const dispatch = useAppDispatch();

  const onRefresh = () => {
    if (userInfo?.data?.user.id) {
      setRefreshing(true);
      dispatch(getUserProducts(userInfo.data.user.id));
      setRefreshing(false);
    }
  };

  if (isLoading === true) {
    return (
      <View style={styles.loadingWrapper}>
        <Loader />
        <Text style={styles.text}>Будь ласка зачекайте</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.userInfoWrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.heading}>Привіт, {userInfo.data?.user.name}!</Text>
      <Button onPress={logoutHandler}>Вийти</Button>
      {userOrders.length === 0 ? (
        <Text style={styles.text}>Список замовлень порожній</Text>
      ) : (
        <View style={styles.orderWrapper}>
          <Text style={styles.heading}>Список замовлень</Text>
          <View>
            {userOrders.map(item => {
              return (
                <View key={item._id} style={styles.order}>
                  <Text style={styles.text}>
                    {formattedDate(item.createdAt)}
                  </Text>
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
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
