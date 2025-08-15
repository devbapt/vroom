import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer> // This is the main entry point of the app 
      <AppNavigator />
    </NavigationContainer>
  );
}
