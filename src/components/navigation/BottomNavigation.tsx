import React from 'react';
import Toast from 'react-native-toast-message';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {getFilteredCart} from '../../redux/cart/cartSlice';
import {useAppSelector} from '../../redux/hooks';
import {getFavorites} from '../../redux/products/productsSlice';
import {CartScreen} from '../../screens/CartScreen';
import {FavoriteScreen} from '../../screens/FavoriteScreen';
import {NewsScreen} from '../../screens/NewsScreen';
import {Basket} from '../icons/Basket';
import {Heart} from '../icons/Heart';
import {Home} from '../icons/Home';
import {Menu} from '../icons/Menu';
import TopNavigation from './TopNavigation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const cartLength = useAppSelector(getFilteredCart).length;
  const favoriteLength = useAppSelector(getFavorites).length;

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
