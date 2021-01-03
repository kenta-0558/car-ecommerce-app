const carImages = [
  {id: 1, img: require('../../img/car1.jpg')},
  {id: 2, img: require('../../img/car2.jpg')},
  {id: 3, img: require('../../img/car3.jpg')},
  {id: 4, img: require('../../img/car4.jpg')},
  {id: 5, img: require('../../img/car5.jpg')},
  {id: 6, img: require('../../img/car6.jpg')},
  {id: 7, img: require('../../img/car7.jpg')},
  {id: 8, img: require('../../img/car8.jpg')},
  {id: 9, img: require('../../img/car9.jpg')},
  {id: 10, img: require('../../img/car10.jpg')},
  {id: 11, img: require('../../img/car11.jpg')},
  {id: 12, img: require('../../img/car12.jpg')},
  {id: 13, img: require('../../img/car13.jpg')},
  {id: 14, img: require('../../img/car14.jpg')},
  {id: 15, img: require('../../img/car15.jpg')},
  {id: 16, img: require('../../img/car16.jpg')},
  {id: 17, img: require('../../img/car17.jpg')},
  {id: 18, img: require('../../img/car18.jpg')},
  {id: 19, img: require('../../img/car19.jpg')},
  {id: 20, img: require('../../img/car20.jpg')},
];
  
export const getCarImage = (id) => {
  
  const targetObj = carImages.find(obj => obj.id === id);
  
  return targetObj.img;
};