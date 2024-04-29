/* eslint-disable prettier/prettier */
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import CustomIcon from './CustomIcon';

const genres: any = {
  28 : 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const MovieCard = (props:any) => {
  return (
      <TouchableOpacity onPress={() => props.cardFunction()}>
        <View style={[
          styles.container,
        ]}>
          <Image
          style={[styles.cardImage]}
          source={{uri: props.imagePath}}/>
          <View
          style={styles.textContainer}
          >
          <View style={styles.titleMovies}>
            <Text
              numberOfLines={1}
            >
                Movie
              </Text>
              <Text
              numberOfLines={1}
              style={styles.textTitle}>
                {props.title}
              </Text>
          </View>
            <View style={styles.genreContainer}>
              {
                props.genre.map((item: any) => {
                  return (
                    <View
                    key={item}
                    style={styles.genreBox}
                    >
                      <Text style={styles.genreText}>{genres[item]}</Text>
                    </View>
                  );
                })
              }


            </View>
              <View style={styles.voteContainer}>
                <View>
                  <CustomIcon
                    name = {'star'}
                    style = {styles.iconContainer}
                  />
                </View>
                <Text style={styles.voteText}>{props.vote_average} ( {props.vote_count} )</Text>
              </View>
          </View>
        </View>

      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.White,
  },
  textContainer: {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: 10,
  maxWidth: '100%',
  },
  cardImage : {
    width: 130,
    height: 130,
    margin: SPACING.space_28,
    aspectRatio: 3.5 / 4.5,

  },
  titleMovies: {
    color: COLORS.WhiteRGBA15,
    marginTop: 20,
  },
  textTitle : {
    fontFamily:FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.Black,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  rateContainer : {
    flexDirection: 'row',
    gap: SPACING.space_4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  voteContainer: {
    display: 'flex',
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    color: COLORS.Yellow,
    fontSize: FONTSIZE.size_18,
    marginRight: SPACING.space_4,
  },
  voteText : {
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  genreContainer : {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_10,
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  genreBox : {
    borderColor: COLORS.BlackRGB10,
    borderWidth:2,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
  },
  genreText : {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color:COLORS.Black,
  },
});

export default MovieCard;
