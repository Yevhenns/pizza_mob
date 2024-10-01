import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {getUserInfo} from '../redux/auth/authSlice';
import {useAppSelector} from '../redux/hooks';

export function Avatar() {
  const userInfo = useAppSelector(getUserInfo);

  return (
    <View style={styles.layout}>
      {userInfo?.data?.user.photo && (
        <Image
          source={{uri: userInfo?.data?.user.photo}}
          width={40}
          height={40}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});
