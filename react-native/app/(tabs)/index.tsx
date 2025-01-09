import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen1 from '@/src/screens/IntroScreen1';
import IntroScreen2 from '@/src/screens/IntroScreen2';
import MainApp from '@/src/screens/MainApp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider } from '../../src/context/CartContext'
import Checkout from '@/src/screens/Checkout';

const Stack = createNativeStackNavigator();

function RootStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // useEffect(() => {
  //   const checkIfFirstLaunch = async () => {
  //     try {
  //       const firstLaunch = await AsyncStorage.getItem('alreadyLaunched');
  //       if (firstLaunch === null) {
  //         await AsyncStorage.setItem('alreadyLaunched', 'true');
  //       }
  //       else {
  //         setIsFirstLaunch(false);
  //       }
  //     } catch (error) {
  //       console.log("Error checking AsyncStorage:", error);
  //     }
  //   };

  //   checkIfFirstLaunch();
  // }, []);

  useEffect(() => {
    const removeAlreadyLaunched = async () => {
      try {
        const firstLaunch = await AsyncStorage.removeItem('alreadyLaunched');
      } catch (error) {
        console.log("Error checking AsyncStorage:", error);
      }
    };

    removeAlreadyLaunched();
  }, []);



  return (
    <Stack.Navigator>
      {isFirstLaunch ? (
        <>
          <Stack.Screen name="IntroScreen1" component={IntroScreen1} options={{ headerShown: false }} />
          <Stack.Screen name="IntroScreen2" component={IntroScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <RootStack />
    </CartProvider>
  );
}