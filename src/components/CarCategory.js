import React from 'react';
import CarCategoryContainer from './CarCategoryContainer';
import { getCarImage } from '../screens/Home/CarImages';
import { BORDER_COLOR, MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../util/GlobalVariables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// const quries = ['sport', 'luxury', 'suv', 'used'];

const CarCategory = ({ title, cars, navigation, type }) => {

  return (
    <CarCategoryContainer title={title} >
      <ScrollView 
        horizontal={true}
        style={styles.horizonatalScrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {cars.map(car => {

          const source = getCarImage(car.id);
          return (
            <Pressable 
              style={styles.carInfoContainer} 
              key={car.name}
              onPress={() => navigation.navigate('CarDetail', { car: car, image: source })} 
              // android_ripple={{color: BORDER_COLOR}}  
            >
              <Image 
                source={source}
                style={styles.carImage}  
              />
              <View style={styles.carInfoDetail}>
                <Text style={styles.carName}>{car.year} {car.name.length > 10 ? car.name.slice(0, 8) + '..': car.name}</Text>
                <Text>{car.mile} mile</Text>
                <Text>${car.price}</Text>
              </View>
            </Pressable>
          )
        })}

        <View style={styles.iconContainer}>
          <Pressable 
            style={styles.iconCircle}
            onPress={() => navigation.navigate('Search', { query: type })} 
            android_ripple={{color: BORDER_COLOR, radius: WINDOW_WIDTH * 0.35 * 0.5 / 2}}  
          >
            <Icon style={{color: MAIN_COLOR}} name="keyboard-arrow-right" size={35}/>
          </Pressable>
          <Text style={styles.iconTitle}>VIEW MORE</Text>
        </View>
      </ScrollView>
    </CarCategoryContainer>
  );
}

export default CarCategory;

const styles = StyleSheet.create({
  carInfoContainer: {
    width: WINDOW_WIDTH * 0.35,
    marginRight: 12,
  },
  carImage: {
    width: '100%',
    height: WINDOW_WIDTH * 0.35 * 0.7,
  },
  carInfoDetail: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  carName: {
    fontSize: WINDOW_HEIGHT / 50,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: WINDOW_WIDTH * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#fff',
    width: WINDOW_WIDTH * 0.35 * 0.5,
    height: WINDOW_WIDTH * 0.35 * 0.5,
    borderRadius: WINDOW_WIDTH * 0.35 * 0.5 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitle: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT / 55,
    marginTop: 5,
  },
});