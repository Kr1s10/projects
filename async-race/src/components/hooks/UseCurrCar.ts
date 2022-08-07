import { useState } from 'react';
import { ICar } from '../../types/interfaces';

function useCurrCar() {
  const initState = { id: -1, name: '', color: '' };
  const [car, setCar] = useState<ICar>(initState);
  const addCar = (currCar: ICar) => setCar(currCar);

  const resetCar = () => setCar(initState);

  return { car, addCar, resetCar };
}

export default useCurrCar;
