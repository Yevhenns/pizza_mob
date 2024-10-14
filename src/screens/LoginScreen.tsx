import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {colors} from '../assets/styleVariables';
import {GoogleSigninBtn} from '../components/GoogleSigninBtn';
import {UserOrders} from '../components/UserOrders/UserOrders';
import {getUserInfo, logout} from '../redux/auth/authSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getUserProducts} from '../redux/userOrders/userOrdersOperations';
import {setUserId} from '../redux/userOrders/userOrdersSlice';

export function LoginScreen() {
  const [error, setError] = useState(null);

  const userInfo = useAppSelector(getUserInfo);

  const dispatch = useAppDispatch();

  const setLoginError = (liginError: React.SetStateAction<null | any>) => {
    setError(liginError);
  };

  const logoutHandler = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(logout());
    } catch (err) {
      console.error('Sign out error', err);
    }
  };
  console.log(typeof GoogleSignin);

  useEffect(() => {
    if (userInfo?.data?.user.id) {
      dispatch(setUserId(userInfo.data.user.id));
      dispatch(getUserProducts(userInfo.data?.user.id));
    }
  }, [dispatch, userInfo?.data?.user.id]);

  return (
    <View style={userInfo === null ? styles.container : styles.filledContainer}>
      {userInfo !== null ? (
        <UserOrders logoutHandler={logoutHandler} userInfo={userInfo} />
      ) : (
        <GoogleSigninBtn
          setLoginError={setLoginError}
          GoogleSignin={GoogleSignin}
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

  filledContainer: {
    flex: 1,
    padding: 10,
  },

  errorText: {
    color: colors.errorColor,
    marginTop: 10,
  },
});
