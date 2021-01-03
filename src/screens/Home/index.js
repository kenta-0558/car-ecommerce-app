import React from 'react';
import Account from './Account';
import Discover from './Discover';
import Favorites from './Favorites';
import Search from './Search';
import { MAIN_COLOR } from '../../util/GlobalVariables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const icons = {
  Discover: 'explore',
  Search: 'search',
  Favorites: 'favorite',
  Account: 'assignment-ind',
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  
  return (
    <>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const icon = icons[route.name];
          const title = route.name.toUpperCase();

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              style={styles.tab}
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <Icon name={icon} style={{ color: isFocused ? MAIN_COLOR : '#222' }} size={26}/>
              <Text style={[styles.tabTitle, { color: isFocused ? MAIN_COLOR : '#222' }]}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  }, 
  tabTitle: {
    fontSize: 10,
  },
});

const Tab = createBottomTabNavigator();

const Home = () => {

  return (
    <>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen 
          name="Discover" 
          component={Discover} 
        />
        <Tab.Screen 
          name="Search" 
          component={Search} 
        />
        <Tab.Screen 
          name="Favorites" 
          component={Favorites} 
        />
        <Tab.Screen 
          name="Account" 
          component={Account} 
          options={{
            title: 'Account'
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;