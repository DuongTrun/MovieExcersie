/* eslint-disable prettier/prettier */
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  baseImagePath,
  newMovies,

}
from '../api/apicalls';
import { COLORS } from '../../theme/theme';
import MovieCard from '../components/MovieCard';

const { width } = Dimensions.get('window');

const getNewMoviesList = async () => {
  try {
    let response = await fetch(newMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Somethings went wrong in getNewMoviesList function', error);
  }
};

const HomeScreen = ({ navigation }: any) => {
  const [newMoviesList, setNewMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNewMovies = await getNewMoviesList();
      setNewMoviesList(tempNewMovies.results);
    })();
  }, []);

  if (newMoviesList === undefined && newMoviesList == null) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar hidden />
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={newMoviesList}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal={false}
        renderItem={({ item, index }) => (
          <MovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('TicketDetails', { id: item.id });
              console.log(item.id);
            }}
            maxWidth={width}
            isFirst={index === 0}
            isLast={index === newMoviesList?.length - 1}
            title={item.original_title}
            genre={item.genre_ids.slice(1, 3)}
            imagePath={baseImagePath('w342', item.poster_path)}
            vote_average={Math.round(item.vote_average * 100) / 100}
            vote_count={item.vote_count}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
  },
});

export default HomeScreen;
