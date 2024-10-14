import React from 'react';
import {ActivityIndicator} from 'react-native';

import {colors} from '../assets/styleVariables';

export function Loader() {
  return <ActivityIndicator size="large" color={colors.accentColor} />;
}
