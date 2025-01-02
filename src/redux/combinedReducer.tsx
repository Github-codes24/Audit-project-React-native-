import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./apiSlice/baseApiSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import  authSlice  from "./stateSlice/authStateSlice";
// Define persist configurations
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // whitelist: ['accessToken', 'loginResponse'], // Only persist 'accessToken' and 'loginResponse'
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  // Uncomment and replace `authSlice` with your actual slice if you need to persist it:
  authSlice: persistReducer(authPersistConfig, authSlice), 
});
