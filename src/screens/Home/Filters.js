import React from 'react';
import { MAIN_COLOR } from '../../util/GlobalVariables';
import { Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';


const Filters = ({ navigation }) => {
  return (
    <View>
      <Header 
        backgroundColor={MAIN_COLOR}
        leftComponent={
        <Icon 
            name="keyboard-arrow-left" 
            type="material" 
            color="#fff"
            onPress={() => navigation.goBack()}    
        />
        }
        centerComponent={{ text: 'Filters', style: { color: '#fff' } }}
      />
    </View>  
  );
};

export default Filters;