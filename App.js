import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/rootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ToastComponent } from './src/utils/Toast';
import FCMHandler from './src/reusableComponent/fcmHandler/fcmHandler';  

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
          <FCMHandler />  {/* ✅ Place inside Provider to access Redux */}
        </NavigationContainer>
      </PersistGate>
      <ToastComponent />
    </Provider>
  );
};

export default App;
