import React, { useEffect } from 'react';
import Admin from './src/screens/Admin/Home';
import CarDetail from './src/screens/Home/CarDetail';
import Home from './src/screens/Home/index';
import Login from './src/screens/Admin/Login';
import SignUp from './src/screens/Admin/SignUp';
import SplashScreen from './src/screens/SplashScreen';
import { AuthContext, WINDOW_WIDTH } from './src/util/GlobalVariables';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

const getHeaderTitle = (route) => {
  
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Discover';

  switch (routeName) {
    case 'Account':
      return 'Account';
    case 'Discover':
      return null;
    case 'Favorites':
      return 'Favorites';
    case 'Search':
      return  () => <TextInput 
        onFocus={() => console.log('Pressed')}
        placeholder="Search by make, model or keyword"
        style={styles.headerInput}
      />;
  }
};

export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOG_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {

    const getAuthentication = async() => {
      
      const userToken = await AsyncStorage.getItem('userToken'); // Error handling must be added.

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    getAuthentication();
  }, []);

  const authContext = React.useMemo(
    () => ({
      logIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'LOG_IN', token: 'dummy-auth-token' });
      },
      logOut: () => dispatch({ type: 'LOG_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'LOG_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Admin"
            screenOptions={{headerTitleAlign: 'center'}}  
          >
            {state.userToken === null ? (
              <>
                <Stack.Screen 
                  name="Admin" 
                  component={Admin} 
                  options={{headerShown: false}}
                />
                <Stack.Screen 
                  name="Login" 
                  component={Login} 
                  options={{
                    title: false,
                    headerStyle: {
                      shadowColor: 'transparent',
                      elevation: 0,
                    }
                  }}
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUp} 
                  options={{
                    title: false,
                    headerStyle: {
                      shadowColor: 'transparent',
                      elevation: 0,
                    }
                  }}
                />
              </>
            ) 
            : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="CarDetail"
                  component={CarDetail}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    marginVertical: 10,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.05 * 2,
  }
});

//cars
{/* <a href='https://www.freepik.com/vectors/car'>Car vector created by naulicreative - www.freepik.com</a> */}
{/* <a href='https://www.freepik.com/psd/background'>Background psd created by zlatko_plamenov - www.freepik.com</a> */}
// https://www.pngfind.com/download/ixoJxb_toyota-gt86-png-image-free-car-image-logo/
//https://www.pngfind.com/download/JwmJob_our-fleet-toyota-low-price-car-hd-png/
// https://www.pngfind.com/download/himoJhx_pre-owned-2010-toyota-prius-v-toyota-electric/

//brands
// https://freepngimg.com/png/17831-toyota-logo-picture
// https://www.freepnglogos.com/images/nissan-logo-716.html

// car1 Photo by Brian Lundquist on Unsplash <span>Photo by <a href="https://unsplash.com/@bwl667?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Brian Lundquist</a> on <a href="https://unsplash.com/s/photos/nissan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car2 Photo by Asyrafunk RKTW on Unsplash <span>Photo by <a href="https://unsplash.com/@asyrafunk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Asyrafunk RKTW</a> on <a href="https://unsplash.com/s/photos/suzuki?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car3 Photo by Justin Jones on Unsplash <span>Photo by <a href="https://unsplash.com/@jonesy0343?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Justin Jones</a> on <a href="https://unsplash.com/s/photos/porsche-suv?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car4 Photo by Matias Malka on Unsplash <span>Photo by <a href="https://unsplash.com/@matiasmalka?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Matias Malka</a> on <a href="https://unsplash.com/s/photos/tesla?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car5 Photo by Stefan Lehner on Unsplash <span>Photo by <a href="https://unsplash.com/@st_lehner?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Stefan Lehner</a> on <a href="https://unsplash.com/s/photos/tesla?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car6 Photo by Josh Berquist on Unsplash <span>Photo by <a href="https://unsplash.com/@jbdsgns?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Josh Berquist</a> on <a href="https://unsplash.com/s/photos/porsche?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car7 Photo by Xavier Rabasa on Unsplash <span>Photo by <a href="https://unsplash.com/@shadowmousses?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Xavier Rabasa</a> on <a href="https://unsplash.com/s/photos/toyota?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car8 Photo by Łukasz Nieścioruk on Unsplash <span>Photo by <a href="https://unsplash.com/@luki90pl?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Łukasz Nieścioruk</a> on <a href="https://unsplash.com/s/photos/toyota?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car9 Photo by John Torcasio on Unsplash <span>Photo by <a href="https://unsplash.com/@johntorcasio?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">John Torcasio</a> on <a href="https://unsplash.com/s/photos/toyota?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car10 Photo by Robin van Geenen on Unsplash <span>Photo by <a href="https://unsplash.com/@robinvangeenen?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Robin van Geenen</a> on <a href="https://unsplash.com/s/photos/toyota-aygo?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car11 Photo by Daniel Demers on Unsplash <span>Photo by <a href="https://unsplash.com/@vruuhm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Demers</a> on <a href="https://unsplash.com/s/photos/nissan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car12 <span>Photo by <a href="https://unsplash.com/@macauphotoagency?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Macau Photo Agency</a> on <a href="https://unsplash.com/s/photos/toyota?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car13 Photo by Daniel Demers on Unsplash <span>Photo by <a href="https://unsplash.com/@vruuhm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Demers</a> on <a href="https://unsplash.com/s/photos/nissan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car14 Photo by Sahil Patel on Unsplash <span>Photo by <a href="https://unsplash.com/@sam0076?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Sahil Patel</a> on <a href="https://unsplash.com/s/photos/suv?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car15 Photo by Fred Heap on Unsplash <span>Photo by <a href="https://unsplash.com/@fred_heap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Fred Heap</a> on <a href="https://unsplash.com/s/photos/suv?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car16 Photo by moto moto sc on Unsplash <span>Photo by <a href="https://unsplash.com/@motomotosc?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">moto moto sc</a> on <a href="https://unsplash.com/s/photos/suzuki?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car17 Photo by Łukasz Nieścioruk on Unsplash <span>Photo by <a href="https://unsplash.com/@luki90pl?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Łukasz Nieścioruk</a> on <a href="https://unsplash.com/s/photos/toyota?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car18 Photo by Daniel Demers on Unsplash <span>Photo by <a href="https://unsplash.com/@vruuhm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Demers</a> on <a href="https://unsplash.com/s/photos/nissan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car19 Photo by Francesco Califano on Unsplash <span>Photo by <a href="https://unsplash.com/@fracali_?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Francesco Califano</a> on <a href="https://unsplash.com/s/photos/toyota-prius?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
// car20 Photo by Daniel Demers on Unsplash <span>Photo by <a href="https://unsplash.com/@vruuhm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Demers</a> on <a href="https://unsplash.com/s/photos/nissan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>