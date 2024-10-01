/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Toast from 'react-native-toast-message';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {getUserInfo} from '../../redux/auth/authSlice';
import {getFilteredCart} from '../../redux/cart/cartSlice';
import {useAppSelector} from '../../redux/hooks';
import {getFavorites} from '../../redux/products/productsSlice';
import {CartScreen} from '../../screens/CartScreen';
import {FavoriteScreen} from '../../screens/FavoriteScreen';
import {LoginScreen} from '../../screens/LoginScreen';
import {NewsScreen} from '../../screens/NewsScreen';
import {Avatar} from '../Avatar';
import {Basket} from '../icons/Basket';
import {Heart} from '../icons/Heart';
import {Home} from '../icons/Home';
import {Menu} from '../icons/Menu';
import {User} from '../icons/User';
import TopNavigation from './TopNavigation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const cartLength = useAppSelector(getFilteredCart).length;
  const favoriteLength = useAppSelector(getFavorites).length;
  const userInfo = useAppSelector(getUserInfo);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor: '#de612b'},
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => <Home color={color} />,
          }}
          name="Новинки"
          component={NewsScreen}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => {
              return userInfo === null ? <User color={color} /> : <Avatar />;
            },
          }}
          name="Логін"
          component={LoginScreen}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => <Menu color={color} />,
          }}
          name="Категорії"
          component={TopNavigation}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => <Heart color={color} />,
            tabBarBadge: favoriteLength,
          }}
          name="Улюблене"
          component={FavoriteScreen}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => <Basket color={color} />,
            tabBarBadge: cartLength,
          }}
          name="Кошик"
          component={CartScreen}
        />
      </Tab.Navigator>
      <Toast />
    </>
  );
};

export default BottomNavigation;
