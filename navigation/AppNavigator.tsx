import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< Updated upstream
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import { Image } from 'react-native';
=======
import HomeScreen from '../screens/HomeScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import MapScreen from '../screens/MapScreen.js';
>>>>>>> Stashed changes

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  // Simule une photo de profil (à remplacer par un vrai state global ou context)
  const profilePic = null; // Remplace par une vraie URI si besoin
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../assets/user.png')}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: focused ? 2 : 0,
                borderColor: focused ? '#ff3b3f' : 'transparent',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
