import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './combinedReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // If using AsyncStorage for persistence
import logger from 'redux-logger';
import { baseApi } from './apiSlice/baseApiSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Or other storage like LocalStorage, depending on your platform
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger,
    baseApi?.middleware,
  ],
  devTools: true,
});

export const persistor = persistStore(store);
