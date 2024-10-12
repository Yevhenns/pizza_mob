import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CLIENTID} from '@env';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {UserOrders} from '../components/UserOrders';
import {addUserInfo, getUserInfo, logout} from '../redux/auth/authSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getUserProducts} from '../redux/userOrders/userOrdersOperations';
import {
  getUserProductsAll,
  setUserId,
} from '../redux/userOrders/userOrdersSlice';

export function LoginScreen() {
  const [error, setError] = useState(null);

  const userInfo = useAppSelector(getUserInfo);
  const userOrders = useAppSelector(getUserProductsAll);

  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfoRes = await GoogleSignin.signIn();
      dispatch(addUserInfo(userInfoRes));
      setError(null);
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log('Some other error happened:', err);
        setError(err);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(logout());
    } catch (err) {
      console.error('Sign out error', err);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENTID,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (userInfo?.data?.user.id) {
      dispatch(setUserId(userInfo.data.user.id));
      dispatch(getUserProducts(userInfo.data.user.id));
    }
  }, [dispatch, userInfo?.data?.user.id]);

  return (
    <View style={styles.container}>
      {userInfo !== null ? (
        <UserOrders
          logoutHandler={logoutHandler}
          userInfo={userInfo}
          userOrders={userOrders}
        />
      ) : (
        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      {error && <Text style={styles.errorText}>Помилка входу</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInButton: {
    width: 230,
    height: 48,
  },

  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
