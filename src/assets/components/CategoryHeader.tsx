/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';

const CategoryHeader = (props:any) => {
  return (
    <View>
      <Text style={styles.TextContainer}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    TextContainer: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.BlackRGB50,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_15,
    },
});


export default CategoryHeader;
