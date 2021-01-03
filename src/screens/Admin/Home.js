import React, {useEffect, useState} from 'react';
import { MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { Image, StatusBar, StyleSheet, Pressable, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';


const Admin = ({ navigation }) => {

  const [isSignIn, setIsSignIn] = useState(false);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (isSignIn) {
      navigation.navigate('Home');
    }
  }, []);

  return (
    <>
      <StatusBar  backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>

        <View 
          style={{
            height: WINDOW_HEIGHT / 2 - headerHeight,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: '#fff',
          }}
        >
          <Image style={styles.image} source={require('../../img/loginPage.jpg')}/>
        </View>

        <View style={styles.subContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>BESTE PRODUKTE</Text>
            <Text style={[styles.title, {color: MAIN_COLOR}]}>GÜNSTIGSTE PREISE</Text>
            <Text style={styles.title}>GRATIS GELIEFERT</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable 
              style={[styles.buttonLeftContainer, styles.buttonContainer]}
              onPress={() => navigation.navigate('Login')}  
            >
              <Text style={[styles.buttonLeftTitle, styles.buttonTitle]}>Einloggen</Text>
            </Pressable>
            <Pressable 
              style={[styles.buttonRightContainer, styles.buttonContainer]}
              onPress={() => navigation.navigate('SignUp')}  
            >
              <Text style={[styles.buttonRightTitle, styles.buttonTitle]}>Registrieren</Text>
            </Pressable>
          </View>

        </View>

      </View>
    </>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: WINDOW_WIDTH * 0.05
  },
  image: {
    width: WINDOW_WIDTH / 2,
    height: WINDOW_HEIGHT / 6,
  },
  subContainer: {
    height: WINDOW_HEIGHT / 2,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    lineHeight: 30,
    fontSize: WINDOW_HEIGHT / 30,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: { 
    borderRadius: 5,
    paddingVertical: 7,
    width: '48%',
  },
  buttonLeftContainer: {
    borderWidth: 2,
    borderColor: MAIN_COLOR,
  },
  buttonRightContainer: {
    backgroundColor: MAIN_COLOR,  
  },
  buttonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonLeftTitle: {
    color: MAIN_COLOR,
  },
  buttonRightTitle: {
    color: '#fff',
  },
});

