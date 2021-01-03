import React, { useState } from 'react';
import Button from '../../components/Button';
import DetailColumn from '../../components/DetailColumn';
import DetailColumnsContainer from '../../components/DetailColumnsContainer';
import { MAIN_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../util/GlobalVariables';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements'; 


const CarDetail = ({ navigation, route }) => {

  const { car, image } = route.params;

  const [isFirstColumnOpen, setIsFirstColumnOpen] = useState(false);
  const [isSecondColumnOpen, setIsSecondColumnOpen] = useState(false);
  const [isThirdColumnOpen, setIsThirdColumnOpen] = useState(false);
  
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
        leftComponent={
          <Icon 
            name="keyboard-arrow-left" 
            type="material" 
            color="#fff"
            onPress={() => navigation.goBack()}    
          />
        }
      />
      <ScrollView style={styles.subcontainer}>

        <Image 
          source={image}
          style={styles.image}
        />

        <View style={styles.carInfoContainer}>
          <Text style={styles.carName}>{car.name}</Text>
          <Text style={styles.carPrice}>${car.price}</Text>
          <Text style={styles.carMile}>{car.mile} mile</Text>
        </View>

        <View style={styles.carInfoContainer}>

          <DetailColumnsContainer 
            title="Detail" 
            isOpen={isFirstColumnOpen}
            setIsOpen={setIsFirstColumnOpen}  
          >
            <View>
              <DetailColumn 
                firstTitle="Maker"
                firstValue={car.maker}
                secondTitle="Color"
                secondValue={car.color}
              /> 
              <DetailColumn 
                firstTitle="Year"
                firstValue={car.year}
                secondTitle="Status"
                secondValue={car.type === "used" ? "used car" : "new car"}
                marginTop={7}
              /> 
              {/* <DetailColumn 
                firstTitle="Kiichi"
                firstValue="Ichina"
                secondTitle="Kiichi"
                secondValue="Ichina"
                marginTop={7}
              />  */}
            </View>
          </DetailColumnsContainer>
          
          <DetailColumnsContainer 
            title="insurance" 
            isOpen={isSecondColumnOpen}
            setIsOpen={setIsSecondColumnOpen}  
          >
            <Text style={styles.columnText}>You can choose 2 years or 5 years insurance for this car.</Text>
          </DetailColumnsContainer>

          <DetailColumnsContainer 
            title="Options" 
            isOpen={isThirdColumnOpen}
            setIsOpen={setIsThirdColumnOpen}  
          >
            <Text style={styles.columnText}>There are no another extra options for this car.</Text>
          </DetailColumnsContainer>

        </View>

        <Button 
          title="Now Buy"
          onPress={() => alert('This function does not work now. It must be coming soon.')} 
          marginTop={20} 
          marginBottom={20}
        />
        
      </ScrollView>

    </View>  
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subcontainer: {
    paddingHorizontal: WINDOW_WIDTH * 0.05,
  },
  image: {
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.05 * 2,
    height: (WINDOW_WIDTH - WINDOW_WIDTH * 0.05 * 2) * 0.55,
    marginTop: 20,
    // marginBottom: 20,
  },
  carInfoContainer: {
    marginTop: 20,
  },
  carName: {
    fontSize: WINDOW_HEIGHT / 40,
    fontWeight: 'bold',
  },
  carPrice: {
    fontSize: WINDOW_HEIGHT / 15,
    fontWeight: 'bold',  
  },
  carMile: {
    fontSize: WINDOW_HEIGHT / 45,
    fontWeight: 'bold',   
  },
  columnText: {
    fontSize: WINDOW_HEIGHT / 45,
  }
});