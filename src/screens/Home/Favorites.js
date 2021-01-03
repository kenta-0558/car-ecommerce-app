import React, { useEffect, useState } from 'react';
import { brands } from './Discover';
import { CARS } from '../../util/GlobalVariables';
import { getCarImage } from './CarImages';
import { Image, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BORDER_COLOR, MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { Header } from 'react-native-elements';


const MakerButton = ({ maker, value, selectedRanking, getSeletedRanking }) => {
  return (
    <Pressable
      style={styles.makerButtonContainer} 
      onPress={() => getSeletedRanking(value)}
    >
      <Text 
        style={[styles.makerName,
          {color: selectedRanking === value ? MAIN_COLOR: '#000'} 
        ]}>
          {maker}
        </Text>
    </Pressable>
  );
};

const getMakerImage = (maker) => {
  
  let makerImage = null;

  for (let i = 0; i < brands.length; i++) {
    if (brands[i].name === maker) {
      makerImage = brands[i].img;
    }
  };

  return makerImage;
};

const Item = ({ car, index, navigation }) => {

  const image = getCarImage(car.id);
  
  const name = car.name.length > 15 ? car.name.slice(0, 13) + '...' : car.name;

  const source = getMakerImage(car.maker);

  return (
    <Pressable 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('CarDetail', {image, car: car})}
      android_ripple={{color: BORDER_COLOR}}  
    >
      <Image 
        source={source} 
        style={{height: 45, width: 45, backgroundColor: source ? null: MAIN_COLOR, borderRadius: 22.5}}
      />
      <View
        style={styles.itemPressable} 
      >
        <Text style={ styles.itemText}>{index + 1} {name}</Text>
        <Text style={[styles.itemText, styles.itemPoints]}>{car.views} Views</Text>
      </View>
    </Pressable>
  );
};

const Favorites = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [selectedRanking, setSelectedRanking] = useState('all');

  const renderItem = ({ item, index }) => (
    <Item 
      car={item} 
      index={index}
      navigation={navigation}  
    />
  );

  useEffect(() => {
    getInitialRanking();
  }, []);

  const getInitialRanking = () => {
    const initialRanking = CARS.sort((a, b) => (a.views < b.views) ? 1 : (b.views < a.views) ? -1 : 0);
    setData(initialRanking);
  };

  const getSeletedRanking = (maker) => {

    if (maker === 'all') {
      getInitialRanking();
    } else {
      const selectedMakerData = CARS.filter(car => car.maker === maker);

      const selectedRanking = selectedMakerData.sort((a, b) => (a.views < b.views) ? 1 : (b.views < a.views) ? -1 : 0);

      setData(selectedRanking);
    };

    setSelectedRanking(maker);
  };

  return (
    <View style={{flex: 1}}>

      <Header 
        backgroundColor={MAIN_COLOR}
        centerComponent={{ text: 'User Favorites', style: { color: '#fff', fontSize: 18, fontWeight: 'bold'}}}
        statusBarProps={{
          backgroundColor: MAIN_COLOR,
          barStyle: 'light-content',  
        }}
      />

      
      <View
        style={styles.makerButtonsContainer}
      >
        <MakerButton 
          maker="All maker" 
          value="all" 
          selectedRanking={selectedRanking}
          getSeletedRanking={getSeletedRanking}  
        />
        <MakerButton 
          maker="Toyota" 
          value="toyota" 
          selectedRanking={selectedRanking}
          getSeletedRanking={getSeletedRanking}  
        />
        <MakerButton 
          maker="Nissan" 
          value="nissan" 
          selectedRanking={selectedRanking}
          getSeletedRanking={getSeletedRanking}  
        />
        <MakerButton 
          maker="Suzuki"
          value="suzuki" 
          selectedRanking={selectedRanking}
          getSeletedRanking={getSeletedRanking}  
        />
      </View>

      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
     
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  makerButtonsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  makerButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10, 
  },
  makerName: {
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT / 50,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: WINDOW_WIDTH * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  itemText: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: '600',
  },
  itemPressable: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  itemPoints: {
    textAlign: 'right',
  },
});