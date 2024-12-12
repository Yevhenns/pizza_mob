import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {
  GoogleSigninButton,
  GoogleSignin as GoogleSigninType,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {addUserInfo} from '../redux/auth/authSlice';
import {useAppDispatch} from '../redux/hooks';

const CLIENTID = process.env.CLIENTID;

type GoogleSigninBtnProps = {
  setLoginError: (liginError: React.SetStateAction<null | any>) => void;
  GoogleSignin: typeof GoogleSigninType;
};

export function GoogleSigninBtn({
  setLoginError,
  GoogleSignin,
}: GoogleSigninBtnProps) {
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfoRes = await GoogleSignin.signIn();
      dispatch(addUserInfo(userInfoRes));
      setLoginError(null);
    } catch (err: any) {
      console.error(err);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log('Some other error happened:', err);
        setLoginError(err);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENTID,
      offlineAccess: true,
    });
  }, [GoogleSignin]);

  return (
    <GoogleSigninButton
      style={styles.signInButton}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
}

const styles = StyleSheet.create({
  signInButton: {
    width: 230,
    height: 48,
  },
});
