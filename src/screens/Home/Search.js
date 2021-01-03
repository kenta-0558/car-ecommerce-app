import React, { useEffect, useRef, useState } from 'react';
import Filters from './Filters';
import Sort from './Sort';
import { BORDER_COLOR, CARS, MAIN_COLOR, SECONDARY_BACKGROUND, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { getCarImage } from './CarImages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSelectedCars } from '../../util/Functions';


const Item = ({ car, cars, index, navigation }) => {

  const source = getCarImage(car.id);

  const name = car.name.length > 18 ? car.name.slice(0, 19) + '...' : car.name;
  
  return (
    <Pressable
      onPress={() => navigation.navigate('CarDetail', {car: car, image: source})} 
      style={index === cars.length - 1 ? styles.lastItemContainer: styles.itemContainer}
      android_ripple={{color: BORDER_COLOR}}
    >
      <Image 
        style={styles.itemImage}
        source={source}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemTitle}>{'$' + car.price}</Text>
      </View>

      <Text style={styles.itemSubtitle}>{car.type}</Text>
      <Text style={styles.itemSubtitle}>{car.mile + ' mile'}</Text>
    </Pressable>
  );
};


const recommendedMaker = ['toyota', 'nissan', 'suzuki'];
const carCatgories = ['sport', 'luxury', 'suvTruck', 'used'];

const SearchMain = ({ navigation, route, query }) => {

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [queryByMaker, setQueryByMaker] = useState('');

  const [selectedSortType, setSelectedSortType] = useState('');

  const [searchText, setSearchText] = useState('');

  const didMountedRef = useRef(false);

  useEffect(() => {

    if (didMountedRef.current) {
      getData(data, false);
    } else {
      didMountedRef.current = true;
    };
  }, [route.params?.selectedSortType]);

  useEffect(() => {

    function getSelectedData() {

      let selectedData;

      if (recommendedMaker.includes(query)) {
        selectedData = CARS.filter(car => car.maker === query);
      } else if (carCatgories.includes(query)) {
        selectedData = CARS.filter(car => car.type === query);
      } else {
        selectedData = CARS;
      };

      getData(selectedData, true);

    };

    getSelectedData();
    setQueryByMaker(query);
  }, [query]);

  const getData = async (dataForSort, isOriginalChanged) => {
    
    const sortType = await AsyncStorage.getItem('selectedSortType'); 
    
    let sortedSelectedData;

    switch(sortType) {
      case "recommended": 
        sortedSelectedData = dataForSort.sort((a, b) => (a.id > b.id) ? 1 : (b.id > a.id) ? -1 : 0);
        break;
      case "new":
        sortedSelectedData = dataForSort.sort((a, b) => (a.year < b.year) ? 1 : (b.year < a.year) ? -1 : 0);
        break;
      case "lowestPrice":
        sortedSelectedData = dataForSort.sort((a, b) => (a.price > b.price) ? 1 : (b.price > a.price) ? -1 : 0);
        break;
      case "highestPrice":
        sortedSelectedData = dataForSort.sort((a, b) => (a.price < b.price) ? 1 : (b.price < a.price) ? -1 : 0);
        break;
    };

    setData(sortedSelectedData);

    if (isOriginalChanged) {
      setOriginalData(sortedSelectedData);
    };
    
    setSelectedSortType(sortType); 
  };

  const renderItem = ({ item, index }) => {
    return (
      <Item 
        car={item} 
        cars={data} 
        index={index} 
        navigation={navigation}  
      />);
  };

  const removeQueryByMaker = () => {
    getData(CARS, true);
    setOriginalData(CARS);
    setQueryByMaker(null);
  };

  const startSearching = (keyword) => {

    const cloneData = originalData.slice();

    let searchResultData = [];

    cloneData.forEach(car => {
      if (car.name.toUpperCase().includes(keyword.toUpperCase())) {
        searchResultData.push(car); 
      };
    });

    setData(searchResultData);
    setSearchText(keyword);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>

      <SearchBar 
        placeholder="Search by maker or model."
        containerStyle={{
          backgroundColor: MAIN_COLOR,
          borderWidth: 0, //no effect
          shadowColor: 'white', //no effect
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          paddingVertical: 10,
          marginTop: getStatusBarHeight(),
        }}
        inputContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 15,
        }}
        onChangeText={(search) => startSearching(search)}
        value={searchText}
      />

      <View style={styles.searchButtons}>
        <Pressable
          onPress={() => navigation.navigate('Sort', {selectedSortType: selectedSortType})} 
          style={styles.searchButtonContainer}
        >
          <Icon name="swap-vert" size={18}/> 
          <Text style={styles.searchButtonTitle}>SORT</Text>
        </Pressable> 
       
        <Text style={styles.searchButtonTitle}>{data.length} Results</Text>

        {/* <View style={styles.searchButtonContainer}>
          <Icon name="subject" size={18}/>
          <Pressable
            onPress={() => navigation.navigate('Filters')}
          >
            <Text style={styles.searchButtonTitle}>FILTERS</Text>
          </Pressable>
        </View> */}
        {queryByMaker
          ? <Pressable 
              style={styles.searchButtonContainer}
              onPress={() => removeQueryByMaker('pressed')}  
            >
              <Text style={styles.searchButtonTitle}>{queryByMaker.charAt(0).toUpperCase() + queryByMaker.slice(1)}</Text>
              <Icon name="clear" size={18}/>
          </Pressable>
          : null 
        }
        
      </View>
      
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.name} 
      />
        
    </View>
  );
};

const styles = StyleSheet.create({
  searchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: SECONDARY_BACKGROUND,
  },
  searchButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchButtonTitle: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
  itemContainer: {
    paddingVertical: 15, 
    paddingHorizontal: WINDOW_WIDTH * 0.05,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 2,
  },
  lastItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
  itemImage: {
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.05 * 2,
    height: (WINDOW_WIDTH - WINDOW_WIDTH * 0.05 * 2) * 0.55,
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  itemTitle: {
    fontSize: WINDOW_HEIGHT / 40,
    fontWeight: 'bold'
  },
  itemSubtitle: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#757575',
  }
});

const Stack = createStackNavigator();

const Search = ({ route }) => {

  return (
    <Stack.Navigator 
      initialRouteName="SearchMain"
      screenOptions={{
        headerShown: false
      }}  
    >
      <Stack.Screen name="SearchMain">
        {props => <SearchMain {...props} query={route.params?.query} />}
      </Stack.Screen>
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen 
        name="Sort" 
        component={Sort} 
        options={{
          // gestureDirection: 'horizontal'
        }}  
      />
    </Stack.Navigator>
  );
};

export default Search;