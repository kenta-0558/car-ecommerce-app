import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT } from '../util/GlobalVariables';

const CarCategoryContainer = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default CarCategoryContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold',
    color: '#616161',
    marginBottom: 10,
  }, 
});