import React, { useRef, useState } from 'react';
import Button from '../../components/Button';
import { WINDOW_HEIGHT, WINDOW_WIDTH, AuthContext, MAIN_COLOR } from '../../util/GlobalVariables';
import { Animated, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';


const Login = () => {

  const [eMail, setEMail] = useState('');
  const [password, setPassword] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  
  const { logIn } = React.useContext(AuthContext);

  const headerHeight = useHeaderHeight();

  const heightAnim = useRef(new Animated.Value(WINDOW_HEIGHT / 2 - headerHeight)).current;
  const imageWidth = useRef(new Animated.Value(WINDOW_WIDTH / 2)).current;

  const getAuthentication = () => {
    if (eMail === '' && password === '') {
      setHasEmailError(true); 
      setHasPasswordError(true);
    } else if (eMail === '') {
      setHasEmailError(true);
      setHasPasswordError(false);
    } else if (password === '') {
      setHasPasswordError(true); 
      setHasEmailError(false) 
    } else {
      logIn({});
    }
  };

  const changeLayout = () => {

    // Animated.timing(
    //   heightAnim,
    //   {
    //     toValue: (WINDOW_HEIGHT / 2 - headerHeight) / 2,
    //     duration: 1000,
    //   }
    // ).start();

    // Animated.timing(
    //   imageHeight,
    //   {
    //     toValue: (WINDOW_HEIGHT / 8),
    //     duration: 1000,
    //   }
    // ).start();

    Animated.parallel([
      Animated.timing(
        heightAnim,
        {
          toValue: (WINDOW_HEIGHT / 2 - headerHeight) / 3,
          duration: 1000,
          useNativeDriver:false,
        },
      ),
      Animated.timing(
        imageWidth,
        {
          toValue: WINDOW_WIDTH / 2.5,
          duration: 1000, 
          useNativeDriver:false,
        },
      )
    ]).start();

  };

  return (
    <View style={styles.container}>

      <Animated.View 
        style={{
          height: heightAnim,   
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Animated.View style={[styles.imageContainer, {width: imageWidth}]}>
          <Image style={styles.image} source={require('../../img/loginPage.jpg')}/>
        </Animated.View>
      </Animated.View>

      <View style={styles.inputsContainer}>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="E-Mail-Adresse"
            style={styles.input}
            onChangeText={(text) => setEMail(text)}
            onFocus={changeLayout}
          />
        </View>
        {hasEmailError ? <Text style={styles.errorText}>Please Enter your Email address.</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Passwort"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            onFocus={changeLayout}
          />
        </View>
        {hasPasswordError ? <Text style={styles.errorText}>Please enter your password.</Text> : null}

        <Button 
          title="Einloggen"
          marginTop={20}  
          onPress={() => getAuthentication()}
        />  
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingHorizontal: WINDOW_WIDTH * 0.05,  
  },
  imageContainer: {
    // width: WINDOW_WIDTH / 2,
    height: WINDOW_HEIGHT / 6,
    // width: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputsContainer: {
    height: WINDOW_HEIGHT / 2,
  },
  inputContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  input: {
    fontSize: WINDOW_HEIGHT / 45,
  },
  errorText: {
    color: MAIN_COLOR,
  }
});