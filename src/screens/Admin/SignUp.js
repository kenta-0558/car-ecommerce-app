import React, { useState, useContext } from 'react';
import Button from '../../components/Button';
import { AuthContext, MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const InputField = ({ placeholder, setState }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => setState(text)}
      />
    </View>  
  );
}; 

const SmallInputField = ({ placeholder, setState, hasError }) => {
  return (
    <View style={styles.smallInputContainer}>
      <View style={styles.smallInputBorderBottom}>
        <TextInput 
          style={styles.input}
          placeholder={placeholder}
          onChangeText={text => setState(text)}
        />
      </View>
      {hasError ? <Text style={styles.errorMeassage}>Error</Text> : null}
    </View>
  );
};

const getSignInValidation = (email, password, phoneNumber, street, streetNr, zipCode, city) => {

  const isEmailErroneous = getValidation(email);
  const isPasswordErroneous = getValidation(password);
  const isPhoneNumberErroneous = getValidation(phoneNumber);
  const isStreetErroneous = getValidation(street);
  const isStreetNrErroneous = getValidation(streetNr);
  const isZipCodeErroneous = getValidation(zipCode);
  const isCityErroneous = getValidation(city);

  return {
    isEmailErroneous, 
    isPasswordErroneous, 
    isPhoneNumberErroneous, 
    isStreetErroneous, 
    isStreetNrErroneous, 
    isZipCodeErroneous,
    isCityErroneous,
  }
};

const getValidation = (value) => {

  const isErroneous = value === '' ? true : false;

  return isErroneous;
}

const SignUp = () => {

  const { signIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [streetNr, setStreetNr] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [hasPhoneNumberError, setHasPhoneNumberError] = useState(false);
  const [hasStreetError, setHasStreetError] = useState(false);
  const [hasStreetNrError, setHasStreetNrError] = useState(false);
  const [hasZipCodeError, setHasZipCodeError] = useState(false);
  const [hasCityError, setHasCityError] = useState(false);

  const createSignInData = () => {
    
    const {
      isEmailErroneous, 
      isPasswordErroneous, 
      isPhoneNumberErroneous, 
      isStreetErroneous, 
      isStreetNrErroneous,
      isZipCodeErroneous,
      isCityErroneous,
    } = getSignInValidation(email, password, phoneNumber, street, streetNr, zipCode, city);

    if (isEmailErroneous || isPasswordErroneous || isPhoneNumberErroneous || isStreetNrErroneous || isZipCodeErroneous || isCityErroneous) {
      setHasEmailError(isEmailErroneous);
      setHasPasswordError(isPasswordErroneous);
      setHasPhoneNumberError(isPhoneNumberErroneous);
      setHasStreetError(isStreetErroneous);
      setHasStreetNrError(isStreetNrErroneous);
      setHasZipCodeError(isZipCodeErroneous);
      setHasCityError(isCityErroneous);
    } else {
      signIn({ email, password })
    };
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        
        <View style={styles.iconContainer}>
          <Image style={styles.image} source={require('../../img/loginPage.jpg')}/>
        </View>

        <View style={styles.contentContainer}>

          <InputField 
            placeholder="Email address"
            setState={setEmail}
          />
          {hasEmailError ? <Text style={styles.errorMeassage}>Please enter your Email address</Text> : null}

          <InputField 
            placeholder="Enter your new password"
            setState={setPassword}
          />
          {hasPasswordError ? <Text style={styles.errorMeassage}>Please enter your new password</Text> : null}

          <InputField 
            placeholder="Phone number"
            setState={setPhoneNumber}
          />
          {hasPhoneNumberError ? <Text style={styles.errorMeassage}>Please enter your phone number</Text> : null}

          <InputField 
            placeholder="Street"
            setState={setStreet}
          />
          {hasStreetError ? <Text style={styles.errorMeassage}>Please enter your street</Text> : null}

          <View style={styles.smallInputsContainer}>

            <SmallInputField 
              placeholder="Nr." 
              setState={setStreetNr}
              hasError={hasStreetNrError}
            />

            <SmallInputField
              placeholder="extra"  
              setState={setExtraInfo}
            />

            <SmallInputField 
              placeholder="Zip code"
              setState={setZipCode}
              hasError={hasZipCodeError}
            />
            
          </View>

          <InputField 
            placeholder="City"
            setState={setCity}
          />
          {hasCityError ? <Text style={styles.errorMeassage}>Please enter your city</Text> : null}

          <Button 
            marginTop={20}
            title='Anmelden'
            // onPress={() => signIn({ username, password })}
            onPress={createSignInData}
          />

        </View>

      </View>  
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: WINDOW_WIDTH * 0.05
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WINDOW_WIDTH / 2,
    height: WINDOW_HEIGHT / 6,  
  },
  contentContainer: {
    flex: 3,
  },
  inputContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 20,  
  },
  smallInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInputContainer: {
    width: '31%',  
  },
  smallInputBorderBottom: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  input: {
    fontSize: WINDOW_HEIGHT / 45,
  },
  errorMeassage: {
    color: MAIN_COLOR,
  }
});