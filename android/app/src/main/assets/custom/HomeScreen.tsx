/* eslint-disable prettier/prettier */
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  newMovies,
  popularMovies,
  topRated,
  upComingMovies,
}
from '../api/apicalls';
import { COLORS } from '../../../theme/theme';

const {width,height} = Dimensions.get('window')

const HomeScreen = ({navigation}: any) => {

  const [newMoviesList,setNewMoviesList] = useState<any>(undefined);
  const [popularMoviesList,setPopularMoviesList] = useState<any>(undefined);
  const [topRatedMoviesList,setTopRatedMoviesList] = useState<any>(undefined);
  const [upComingMoviesList,setUpComingMoviesList] = useState<any>(undefined);


if (
  newMoviesList == undefined && newMoviesList == null && 
  popularMoviesList == undefined && popularMoviesList == null && 
  topRatedMoviesList == undefined && topRatedMoviesList == null && 
  upComingMoviesList == undefined && upComingMoviesList == null
) {

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.ScrollViewContainer}
    >

    </ScrollView>
  );
}
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  container : {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  ScrollViewContainer : {

  }
})

export default HomeScreen;
