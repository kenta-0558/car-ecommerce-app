import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../util/GlobalVariables';


const DiscoverFooterDetail = ({ title, content, source }) => {
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image 
          source={source}
          style={styles.image}   
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>

    </View>
  );
};

export default DiscoverFooterDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: WINDOW_WIDTH * 0.06,
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: WINDOW_WIDTH * 0.2,
    height: WINDOW_WIDTH * 0.2,
    borderRadius: WINDOW_WIDTH * 0.2 / 2,
    backgroundColor: 'orange',
  },
  textContainer: {
    flex: 2,
  },
  title: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 2,
  }
});