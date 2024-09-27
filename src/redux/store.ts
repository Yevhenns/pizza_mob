import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';

import { cartReducer } from './cart/cartSlice';
import { productsReducer } from './products/productsSlice';

const rootPersistConfig = {
  key: 'root_v1',
  storage: AsyncStorage,
  blacklist: ['basket', 'allProducts'],
};

const cartPersistConfig = {
  key: 'cart_v1',
  storage: AsyncStorage,
  whitelist: ['filteredBasket'],
};

const favoritePersistConfig = {
  key: 'products_v1',
  storage: AsyncStorage,
  whitelist: ['favoriteProducts'],
};

const rootReducer = combineReducers({
  basket: persistReducer(cartPersistConfig, cartReducer),
  allProducts: persistReducer(favoritePersistConfig, productsReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
