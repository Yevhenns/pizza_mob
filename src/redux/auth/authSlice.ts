import {SignInResponse} from '@react-native-google-signin/google-signin';
import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';

const initialState = {
  userInfo: null as null | SignInResponse,
  error: null as any,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    addUserInfo(state, action: {payload: SignInResponse}) {
      state.userInfo = action.payload;
    },
    logout(state) {
      state.userInfo = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const getUserInfo = (state: RootState) => state.auth.userInfo;
export const getIsLoading = (state: RootState) => state.allProducts.isLoading;
export const getError = (state: RootState) => state.allProducts.error;

export const {addUserInfo, logout} = authSlice.actions;
