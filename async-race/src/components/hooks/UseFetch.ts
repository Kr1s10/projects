import { useContext, useState } from 'react';
import { ICar } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';
import { GarageContext } from '../context/GarageContext';

function useFetchCars() {
  const { garagePage, changeGaragePage } = useContext(GarageContext);
  const [cars, setCars] = useState<ICar[]>([]);
  const [count, setCount] = useState(0);

  const fetchCars = async () => {
    const { data, totalCount } = await CarsServise.getCars(garagePage);
    setCars(data);
    setCount(totalCount);
  };

  return {
    cars, count, garagePage, changeGaragePage, fetchCars,
  };
}

export default useFetchCars;
