import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {CLIENTID} from '@env';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Button} from '../components/Button';
import {addUserInfo, getUserInfo, logout} from '../redux/auth/authSlice';
import {useAppSelector} from '../redux/hooks';

export function LoginScreen() {
  const [error, setError] = useState(null);

  const userInfo = useAppSelector(getUserInfo);

  const dispatch = useDispatch();

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

  const signOut = async () => {
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

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={styles.userInfo}>
          <Text>Привіт, {userInfo.data?.user.name}!</Text>
          <Button onPress={signOut}>Вийти</Button>
        </View>
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

  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },

  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
