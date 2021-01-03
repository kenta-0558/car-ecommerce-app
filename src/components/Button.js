import React from 'react';
import { MAIN_COLOR, WINDOW_HEIGHT } from '../util/GlobalVariables';
import { StyleSheet, Pressable, Text } from 'react-native';


const Button = ({ marginTop, marginBottom=null, title, onPress }) => {
  return (
    <Pressable 
      style={[styles.buttonContainer, {marginTop: marginTop, marginBottom: marginBottom}]}
      onPress={onPress}  
    >
      <Text style={styles.buttonTitle}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 5,
    paddingVertical: 15,
  },
  buttonTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT / 45,
  }
});