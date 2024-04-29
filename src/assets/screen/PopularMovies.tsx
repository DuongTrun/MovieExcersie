/* eslint-disable prettier/prettier */
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { baseImagePath, popularMovies } from '../api/apicalls';
import MovieCard from '../components/MovieCard';
import { COLORS } from '../../theme/theme';

const {width,height} = Dimensions.get('window');

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  }
  catch (error) {
    console.error('Something went wrong in function getPopularMoviesList',error);
  }
};

const PopularMovies = ({navigation} : any) => {

  const [popularMoviesList,setPopularMoviesList] = useState<any>(undefined);

  useEffect(() => {
   ( async () => {
     let tempPopular = await getPopularMoviesList();
     setPopularMoviesList(tempPopular.results);
   })();

  },[]);

  if (popularMovies === undefined && popularMovies === undefined) {
    return (
    <ScrollView
      bounces = {false}
      style = {styles.container}
      contentContainerStyle = {styles.ScrollViewContainer}
    >
      <StatusBar hidden/>
      <View style = {styles.loadingContainer}>
        <ActivityIndicator size={'large'}/>
      </View>
    </ScrollView>
    );
  }

  return (
    <ScrollView>
      <StatusBar hidden/>
      <FlatList
        contentContainerStyle = {styles.mainContainer}
        data = {popularMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal ={false}
        renderItem={({item,index}) => (
          <MovieCard
            shouldMarginatedAtEnd = {true}
            cardFunction = {() => {
              navigation.push('TicketDetails',{id: item.id});
            }}
            maxWidth = {width}
            isFirst = {index === 0 ? true : false}
            isLast = {index === popularMoviesList.length - 1 ? true : false}
            title = {item.original_title}
            genre = {item.genre_ids.slice(1,3)}
            imagePath = {baseImagePath('w342',item.poster_path)}
            vote_average = {Math.round(item.vote_average * 100) / 100}
            vote_count = {item.vote_count}
          />
        )}
       />
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container : {
    display: 'flex',
    backgroundColor: COLORS.White,
  },
  ScrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent:'center',
  },
  mainContainer: {
    display: 'flex',
  },
});

export default PopularMovies;
