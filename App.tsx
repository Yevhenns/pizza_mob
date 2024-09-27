import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import BottomNavigation from './src/components/navigation/BottomNavigation';
import { persist, store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <NavigationContainer>
          <BottomNavigation />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
