import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import MainStackNavigation from './src/navigation/stackNavigation/mainStacknavigation';
import RootNavigator from './src/navigation/rootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ToastComponent } from './src/utils/Toast';
import BackgroundLayout from './src/reusableComponent/backgroundLayout/backgroundLayout';


const App = () => (
  <View style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <NavigationContainer>
        <RootNavigator/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
     
     <ToastComponent/>
   
  </View>
);

export default App;
