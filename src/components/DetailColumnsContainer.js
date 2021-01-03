import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { BORDER_COLOR, WINDOW_HEIGHT } from '../util/GlobalVariables';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailColumnsContainer = ({children, title, isOpen, setIsOpen}) => {
  console.log(isOpen);
  return (
    <View style={styles.container}>

      <Pressable 
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}  
      >
        <Text style={styles.title}>{title}</Text>
          {isOpen 
            ? <Icon 
              name="keyboard-arrow-up" 
              size={20}
            />
            : <Icon 
              name="keyboard-arrow-down" 
              size={20}
            /> 
          }
      </Pressable>

      {isOpen 
        ? <View style={styles.detailInfos}>
          {children}
        </View>
        : null
      }
      
    </View>
  );
};

export default DetailColumnsContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: WINDOW_HEIGHT / 45,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  title: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold',
  },
  detailInfos: {
    paddingTop: WINDOW_HEIGHT / 45,
    paddingHorizontal: 15,
    flex: 1, 
    width: "100%", 
    flexDirection: 'row',
  }
});