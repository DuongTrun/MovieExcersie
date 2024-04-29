/* eslint-disable prettier/prettier */
import { ActivityIndicator, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import { baseImagePath, movieDetails } from '../api/apicalls';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CategoryHeader from '../components/CategoryHeader';
import CustomIcon from '../components/CustomIcon';

const getTicketDetails = async (id:number) => {
  try {
    let response = await fetch(movieDetails(id));
    let json = await response.json();
    return json;
  } catch (error)
    {
      console.error('Something went wrong in getTicketDetails function',error);
    }
};



const TicketDetails = ({navigation,route}:any) => {
  const [movieData,setMovieData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getTicketDetails(route.params.id);
      setMovieData(tempMovieData);
    })();
  },[]);

  if (movieData === undefined && movieData == null) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.ScrollViewContainer}
      >
        <View style = {styles.appHeaderContainer}>
          <AppHeader
            name = "close"
            header = {''}
            action = {() => navigation.goback()}
          />
        </View>
        <View style = {styles.loadingContainer}>
          <ActivityIndicator  size={'large'}/>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces = {false}
      showsVerticalScrollIndicator={true}
    >
     <StatusBar hidden/>
     <View>
     <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBG}>

          <LinearGradient
            colors={[COLORS.WhiteRGBA15, COLORS.White]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
          <CategoryHeader title = {'Ticket Details'}/>

            </View>
          </LinearGradient>
        </ImageBackground>
        <View>
            <Image
              source={{uri: baseImagePath('w342', movieData?.poster_path)}}
              style={styles.cardImage}
            />
        </View>
          {/* ========= */}
        <View style = {styles.textContainer}>
            <View>
              <Text  style = {styles.movieHeading}>Movie</Text>
              <Text style = {styles.titleMovie}>{movieData?.original_title} </Text>
            </View>

              <View style = {styles.titleHeading}>
                <Text style = {styles.sameStyle}>Seat Booking</Text>
                  <Text style = {styles.sameStyle}>Running Time</Text>
              </View>
              <View style = {styles.titleHeading}>
                <Text style = {styles.number}>2</Text>
                <Text style = {styles.runTime}>
                  {Math.floor(movieData?.runtime / 60)}h{' '}
                  {Math.floor(movieData?.runtime % 60)}m
              </Text>
                </View>
            <View>
              <Text style = {styles.sameStyle}>Booking ID</Text>
              <Text style = {styles.bookingID}>CM - 0817364250</Text>
            </View>
      </View>
     </View>
     <View style = {styles.oderContainer}>
          <View style = {styles.preOderContainer}>
            <Text style = {styles.preOderText}> Pre Order Food</Text>
          </View>
          <View style = {styles.oderList}>
            <View style = {styles.snackContainer}>
              <CustomIcon
              name ="dollar"
              style={styles.iconStyle}
              />
              <Text style = {styles.title}> Snacks </Text>
              <CustomIcon name ="arrow-right" />
            </View>
            <View style = {styles.hotDrinkContainer}>
              <CustomIcon
              name ="dollar"
              style={styles.iconStyle}
              />
              <Text style = {styles.title}> Hot Drinks </Text>
              <CustomIcon name ="arrow-right"
              />
            </View>
            <View style = {styles.softDrinkContainer}>
              <CustomIcon
              name ="dollar"
              style={styles.iconStyle}
              />
              <Text style = {styles.title}> Soft Drink </Text>
              <CustomIcon name ="arrow-right" />
            </View>
            <View style = {styles.iceCreamContainer}>
              <CustomIcon
              name ="dollar"
              style={styles.iconStyle}
              />
              <Text style = {styles.title}> Ice Cream </Text>
              <CustomIcon name ="arrow-right" />
            </View>
            <View style = {styles.candyContainer}>
              <CustomIcon
              name ="dollar"
              style={styles.iconStyle}
              />
              <Text style = {styles.title}> Sweet Candy </Text>
              <CustomIcon name ="arrow-right" />
            </View>
          </View>
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ScrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_12,
    marginTop: SPACING.space_2,
  },
  textContainer: {
    right: 25,
    left: 165,
    bottom: 85,
    position: 'absolute',
  },
  imageBG: {
    width: '100%',
    aspectRatio: 16 / 14,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardImage: {
    width: '33%',
    aspectRatio: 3.5 / 4.5,
    position: 'absolute',
    bottom: SPACING.space_20 * 4,
    left: SPACING.space_4 * 5,
  },
  movieHeading: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    margin: 2,
  },
  titleMovie: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    margin: 2,

  },
  titleHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,

  },
  groupText1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sameStyle: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 12,
  },
  number: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 12,
  },
  runTime: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 12,
    marginRight: 37,
  },
  bookingID: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 12,
    margin: 2,
  },
  oderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  preOderContainer: {
    margin: 20,
  },
  preOderText: {
    color: COLORS.BlackRGB50,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
  oderList: {
    flex: 1,
    marginRight: 25,
    marginLeft: 25,
  },
  snackContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: COLORS.BlackRGB50,
    flex: 1,
    margin: 10,
    padding: 18,
  },

  hotDrinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: COLORS.BlackRGB50,
    margin: 10,
    padding: 18,

  },
  softDrinkContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: COLORS.BlackRGB50,
    margin: 10,
    padding: 18,

  },
  iceCreamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: COLORS.BlackRGB50,
    margin: 10,
    padding: 18,

  },
  candyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: COLORS.BlackRGB50,
    margin: 10,
    padding: 18,

  },
  iconStyle: {
    marginRight: 10,
    fontSize: FONTSIZE.size_18,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    flex: 1,
    fontSize: FONTSIZE.size_14,
    marginTop: 3,
  },
});

export default TicketDetails;
