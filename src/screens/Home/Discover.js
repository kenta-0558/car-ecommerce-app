import React, { useEffect, useState } from 'react';
import CarCategory from '../../components/CarCategory';
import CarCategoryContainer from '../../components/CarCategoryContainer';
import DiscoverFooterDetail from '../../components/DiscoverFooterDetail';
import { getSelectedCars } from '../../util/Functions';
import { CARS, MAIN_COLOR, BORDER_COLOR, SECONDARY_BACKGROUND, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';


export const brands = [
  {name: 'toyota', img: require('../../img/toyota.jpg')},
  {name: 'nissan', img: require('../../img/nissan.jpg')},
  {name: 'suzuki', img: require('../../img/suzuki.jpg')},
];

const DiscoverMain = ({ navigation }) => {

  const [sportCars, setSportCars] = useState([]);
  const [luxuryCars, setLuxuryCars] = useState([]);
  const [suvTruckCars, setSuvTruckCars] = useState([]);
  const [usedCars, setUsedCars] = useState([]);

  useEffect(() => {
    getCarCategories();
  }, []);

  const getCarCategories = () => {

    const carsForSport = getSelectedCars('type', 'sport').slice(0, 3);
    const carsForLuxury = getSelectedCars('type', 'luxury').slice(0, 3);
    const CarsForSuv = getSelectedCars('type', 'suvTruck').slice(0, 3);
    const CarsForUsed = getSelectedCars('type', 'used').slice(0, 3);

    setSportCars(carsForSport);
    setLuxuryCars(carsForLuxury);
    setSuvTruckCars(CarsForSuv);
    setUsedCars(CarsForUsed);
  };

  return (
    <View style={styles.container}>
      <Header 
        containerStyle={{
          backgroundColor: MAIN_COLOR,
        }}  
        statusBarProps={{
          backgroundColor: MAIN_COLOR,
          barStyle: 'light-content',  
        }}  
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}  
      >
        <View style={styles.subcontainer}>
          <CarCategoryContainer title="Our recommend Brands">
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {brands.map(brand => 
                <Pressable
                  key={brand.name} 
                  style={styles.brandImageContainer}
                  onPress={() => navigation.navigate('Search', {query: brand.name})} 
                  android_ripple={{color: BORDER_COLOR, radius: WINDOW_WIDTH * 0.3 / 2}} 
                >
                  <Image 
                    source={brand.img}
                    style={styles.brandImage}  
                  />
                </Pressable>  
              )}
            </ScrollView>
          </CarCategoryContainer>
          
          <CarCategory title="Sport car" cars={sportCars} navigation={navigation} type="sport"/>
          <CarCategory title="Luxury car" cars={luxuryCars} navigation={navigation} type="luxury"/>
          <CarCategory title="SUV and Truck" cars={suvTruckCars} navigation={navigation} type="suvTruck"/>
          <CarCategory title="Uses car" cars={usedCars} navigation={navigation} type="used"/>
        </View>

        <View style={styles.footer}>
          <View style={styles.subcontainer}>

            <View style={styles.footerTitleContainer}>
              <Text style={styles.footerTitle}>About this App</Text>
            </View>

            <View style={styles.footerContentContainer}>
              <DiscoverFooterDetail 
                title="Who is developer ?"
                content="Kenta Sato who has experience with react js almost 3 years."
                source={require('../../img/me.jpg')}
              />
           
              <DiscoverFooterDetail 
                title="Why this app ?"
                content="To show ability reato create react native app."
                source={require('../../img/pc.jpg')}
              />
           
              <DiscoverFooterDetail 
                title="Notice !"
                content="This app has no backend."
                source={require('../../img/footerPicture.jpg')}
              />
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_BACKGROUND,
  },
  subcontainer: {
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
  brandImageContainer: {
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: WINDOW_WIDTH * 0.3 / 2,
  },
  brandImage: {
    width: WINDOW_WIDTH * 0.3,
    height: WINDOW_WIDTH * 0.3,
  },
  footer: {
    backgroundColor: '#fff',
  },
  footerTitleContainer: {
    paddingVertical: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: WINDOW_HEIGHT / 35,
    fontWeight: 'bold',
  },
  footerContentContainer: {
    // paddingVertical: 15,
  }
});

const Stack = createStackNavigator();

const Discover = () => {
  return (
    <Stack.Navigator 
      // initialRouteName="DiscoverMain"
      initialRouteName="DiscoverMain"
      screenOptions={{
        headerShown: false
      }}  
    >
      <Stack.Screen name="DiscoverMain" component={DiscoverMain} />
    </Stack.Navigator>
  );
};

export default Discover;