/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigator/TabNavigator';
import TicketDetails from './src/assets/screen/TicketDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Movies" component={TabNavigator}/>
        <Stack.Screen name = "TicketDetails" component={TicketDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({});

export default App;
