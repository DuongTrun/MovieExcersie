/* eslint-disable prettier/prettier */
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { topRated,baseImagePath } from '../api/apicalls';
import MovieCard from '../components/MovieCard';
import { COLORS } from '../../theme/theme';

const {width,height} = Dimensions.get('window');
const getTopRatedMoviesList = async () => {
  try {
    let response = await fetch(topRated);
    let json = await response.json();
    return json;
  } catch (error)
  {
    console.error('Somethings went wrong in function topRatedMoviesList',error);
  }
};



const TopRatedMovies = ({navigation} : any) => {
  const [topRatedMoviesList,setTopRatedMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempTopRated = await getTopRatedMoviesList();
      setTopRatedMoviesList(tempTopRated.results);
    })();

  },[]);

  if (topRatedMoviesList === undefined && topRatedMoviesList === null) {
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
          data={topRatedMoviesList}
          keyExtractor={(item:any) => item.id}
          horizontal = {false}
          renderItem={({item,index}) => (
            <MovieCard
              shouldMarginatedAtEnd = {true}
              cardFunction = {() => {
                navigation.push('TicketDetails',{id: item.id});
              }}
              maxWidth = {width}
              isFirst = {index === 0 ? true : false}
              isLast = {index === topRatedMoviesList.length - 1 ? true : false}
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


export default TopRatedMovies;
