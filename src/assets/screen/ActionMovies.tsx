/* eslint-disable prettier/prettier */
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { baseImagePath, newMovies, popularMovies } from '../api/apicalls';
import MovieCard from '../components/MovieCard';
import { COLORS } from '../../theme/theme';

const {width,height} = Dimensions.get('window');

const getActionMoviesList = async () => {
  try {
    let response = await fetch(newMovies);
    let json = await response.json();
    return json;
  }
  catch (error) {
    console.error('Something went wrong in function getActionMoviesList',error);
  }
};

const ActionMovies = ({navigation} : any) => {

  const [actionMoviesList, setActionMoviesList] = useState<any>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([28]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempActionMoviesList = await getActionMoviesList();
        setActionMoviesList(tempActionMoviesList.results);
      } catch (error) {
        console.error('Error fetching action movies: ', error);
      }
    };

    fetchData();
  }, []);

  const filterMoviesByGenreId = () => {
    const filtered = actionMoviesList.filter(movie =>
      movie.genre_ids.some((genreId: number) => selectedGenres.includes(genreId))
    );
    return filtered;
  };
  const filteredMovies = filterMoviesByGenreId();

 if (popularMovies === undefined && popularMovies === undefined) {
  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.ScrollViewContainer}
    >
      <StatusBar hidden/>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    </ScrollView>
  );
 }

  return (
    <ScrollView>
      <StatusBar hidden />
      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={filteredMovies} // Sử dụng danh sách phim đã lọc thay vì popularMoviesList
        keyExtractor={(item: any) => item.id.toString()} // Đảm bảo key là một chuỗi
        horizontal={false}
        renderItem={({ item, index }) => (
          <MovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('TicketDetails',{id: item.id});
            }}
            maxWidth={width}
            isFirst={index === 0 ? true : false}
            isLast={index === filteredMovies.length - 1 ? true : false}
            title={item.original_title}
            genre={item.genre_ids.slice(1, 3)}
            imagePath={baseImagePath('w342', item.poster_path)}
            vote_average={Math.round(item.vote_average * 100) / 100}
            vote_count={item.vote_count}
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



export default ActionMovies;

