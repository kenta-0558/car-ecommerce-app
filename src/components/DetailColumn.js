import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT } from '../util/GlobalVariables';

const DetailColumn = ({firstTitle, firstValue, secondTitle, secondValue, marginTop}) => {
  return (
    <View style={[styles.container, {marginTop, marginTop}]}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{firstTitle}</Text>
        <Text style={styles.value}>{firstValue}</Text>
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{secondTitle}</Text>
        <Text style={styles.value}>{secondValue}</Text>
      </View>
    </View>    
  );
};

export default DetailColumn;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: "100%", 
    flexDirection: 'row',
  },
  subcontainer: {
    width: '50%',
  },  
  title: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold'
  },
  value: {
    fontSize: WINDOW_HEIGHT / 45
  }
});