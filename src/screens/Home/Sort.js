import React, { useEffect, useState } from 'react';
import { MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import CheckBox from '@react-native-community/checkbox';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


const sortList = [
  {title: 'Recommended', value: 'recommended'},
  {title: 'Newest Model', value: 'new'},
  {title: 'Lowest Price', value: 'lowestPrice'},
  {title: 'Highest Price', value: 'highestPrice'},
];

const Item = ({navigation, selectedSortType, setSelectedSortType, title, value}) => {

  const setSortType =  async (value) => {

    setSelectedSortType(value);
    
    try {
        console.log('setItem');
        await AsyncStorage.setItem('selectedSortType', value);
        navigation.navigate('SearchMain', {selectedSortType: value});
    } catch (e) {
        // saving error
      console.log(e);
    };

  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <CheckBox 
        tintColors={{ true: MAIN_COLOR }}
        value={value === selectedSortType ? true : false}
        onValueChange={() => setSortType(value)}
      />
    </View>
  );
};

const Sort = ({ navigation, route }) => {

  const [selectedSortType, setSelectedSortType] = useState('');

  useEffect(() => {
    setSelectedSortType(route.params.selectedSortType);
  }, []);

  const renderItem = ({ item }) => (
    <Item 
      selectedSortType={selectedSortType}
      setSelectedSortType={setSelectedSortType}
      title={item.title} 
      value={item.value} 
      navigation={navigation} 
    />
  );

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
        centerComponent={{ text: 'Sort', style: { color: '#fff', fontSize: 18, fontWeight: 'bold'}}}
      />

      <View style={styles.container}>
        <FlatList
          data={sortList}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  itemTitle: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold',
  }
});