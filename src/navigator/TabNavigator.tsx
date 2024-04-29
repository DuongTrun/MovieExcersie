/* eslint-disable prettier/prettier */
import { StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../assets/screen/HomeScreen';
import PopularMovies from '../assets/screen/PopularMovies';
import TopRatedMovies from '../assets/screen/TopRatedMovies';
import ActionMovies from '../assets/screen/ActionMovies';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
   <Tab.Navigator>
     <Tab.Screen name="New" component={HomeScreen} />
      <Tab.Screen name="Popular" component={PopularMovies} />
      <Tab.Screen name="Top Rated" component={TopRatedMovies} />
      <Tab.Screen name="Action" component={ActionMovies} />
   </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});


export default TabNavigator;
