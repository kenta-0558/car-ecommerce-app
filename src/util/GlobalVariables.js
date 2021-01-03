import React from 'react';
import { Dimensions } from 'react-native';

export const AuthContext = React.createContext();

export const MAIN_COLOR = '#e50615';
export const SECONDARY_BACKGROUND = '#F5F5F5';
export const BORDER_COLOR = '#E0E0E0';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;


export const CARS = [
  {id: 1, name: 'Nissan Dope 370 Z', year: '2018', price: 45000, type: 'sport', mile: 6332, maker: 'nissan', color: 'Sliver', views: 15000},
  {id: 2, name: 'Suzuki Swift', year: '2017', price: 30000, type: 'used', mile: 6332, maker: 'suzuki', color: 'blue', views: 3000},
  {id: 3, name: 'Mercedes-Benz GLC 300', year: '2019', price: 52000, type: 'luxury', mile: 6332, maker: 'mercedes', color: 'white', views: 10350},  
  {id: 4, name: 'Tesla Model X', year: '2018', price: 60000, type: 'suvTruck', mile: 6332, maker: 'tesla', color: 'black', views: 34673},
  {id: 5, name: 'Tesla Model 3', year: '2019', price: 55000, type: 'luxury', mile: 6332, maker: 'tesla', color: 'black', views: 13245},
  {id: 6, name: 'Porsche Taycan', year: '2020', price: 70000, type: 'luxury', mile: 6332, maker: 'porsche', color: 'black', views: 11111},
  {id: 7, name: 'Toyota GT86', year: '2018', price: 41500, type: 'sport', mile: 6332, maker: 'toyota', color: 'red', views: 5340},
  {id: 8, name: 'Lexus RC 350 F-Sport', year: '2017', price: 48000, type: 'luxury', mile: 6332, maker: 'lexus', color: 'white', views: 8932},
  {id: 9, name: 'Toyota Hilux Double Cab 4x4', year: '2016', price: 25000, type: 'suvTruck', mile: 6332, maker: 'toyota', color: 'grey', views: 55800},
  {id: 10, name: 'Toyota Aygo', year: '2013', price: 18000, type: 'used', mile: 6332, maker: 'toyota', color: 'blue', views: 22222},
  {id: 11, name: 'Nissan 350z', year: '2017', price: 32000, type: 'sport', mile: 6332, maker: 'nissan', color: 'purple', views: 17234},
  {id: 12, name: 'Toyota Supra, 3rd Generation (RW)', year: '2000', price: 10000, type: 'used', mile: 6332, maker: 'toyota', color: 'white', views: 18856},
  {id: 13, name: 'Nissan 370z Daytime', year: '2017', price: 38500, type: 'sport', mile: 6332, maker: 'nissan', color: 'white', views: 29876},
  {id: 14, name: 'AUDI Q3', year: '2017', price: 51350, type: 'suvTruck', mile: 6332, maker: 'audi', color: 'white', views: 9999},
  {id: 15, name: 'Nissan Qashqai', year: '2016', price: 40000, type: 'suvTruck', mile: 6332, maker: 'nissan', color: 'silver',views: 17864},
  {id: 16, name: 'Suzuki truck', year: '2015', price: 15000, type: 'suvTruck', mile: 6332, maker: 'suzuki', color: 'black', views: 23987},
  {id: 17, name: 'Alfa Romeo Giulia Quadrifoglio', year: '2017', price: 36000, type: 'luxury', mile: 6332, maker: 'alfa romeo', color: 'red', views: 1234},
  {id: 18, name: 'Nissan 350z z33', year: '2010', price: 28500, type: 'used', mile: 6332, maker: 'nissan', color: 'black', views: 15237},
  {id: 19, name: 'Toyota Truck', year: '2005', price: 22250, type: 'suvTruck', mile: 6332, maker: 'toyota', color: 'white', views: 8943},
  {id: 20, name: 'Nissan 370z', year: '2017', price: 36500, type: 'sport', mile: 6332, maker: 'nissan', color: 'silver', views: 45678},
];


  

