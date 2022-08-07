import React, { Dispatch, useMemo, useState } from 'react';
import { ICar } from '../../types/interfaces';

interface IGarage {
  initStateCar: ICar;
  garagePage: number;
  setGaragePage: Dispatch<number>;
  winnersPage: number;
  setWinnersPage: Dispatch<number>;
  currentCar: ICar;
  setCurrentCar: Dispatch<ICar>;
}
const initStateCar = { id: 0, name: '', color: '' };

export const GarageContext = React.createContext<IGarage>({
  initStateCar,
  garagePage: 1,
  setGaragePage: () => {},
  winnersPage: 1,
  setWinnersPage: () => {},
  currentCar: initStateCar,
  setCurrentCar: () => {},
});

export function GarageState({ children }: { children: React.ReactNode }) {
  const [garagePage, setGaragePage] = useState(1);
  const [winnersPage, setWinnersPage] = useState(1);
  const [currentCar, setCurrentCar] = useState<ICar>(initStateCar);

  const context = {
    initStateCar,
    garagePage,
    setGaragePage,
    winnersPage,
    setWinnersPage,
    currentCar,
    setCurrentCar,
  };

  return (
    <GarageContext.Provider value={useMemo(() => context, [context])}>
      { children }
    </GarageContext.Provider>
  );
}
