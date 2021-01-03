import React, { useEffect } from 'react';
import Button from '../../components/Button';
import { AuthContext, MAIN_COLOR, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';


const Account = ({ navigation }) => {

  const { logOut } = React.useContext(AuthContext);

  return (
    <>
      <Header 
        backgroundColor={MAIN_COLOR}
        centerComponent={{ text: 'Account', style: { color: '#fff', fontSize: 18, fontWeight: 'bold'} }}
        // centerContainerStyle={{fontSize: 16}}
        // statusBarProps={{
        //   backgroundColor: 'blue',
        //   barStyle: 'light-content',  
        // }}
      />  
      <View style={styles.container}>
        <Button
          title="Ausloggen"
          marginTop={20} 
          onPress={() => logOut()} 
        />
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
});