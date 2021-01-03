import { CARS } from './GlobalVariables';

export const getSelectedCars = (keyword, query) => {
  
  const selectedCars = CARS.filter(car => car[keyword] === query);

  return selectedCars;
};