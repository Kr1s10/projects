import React, { useMemo, useState } from 'react';
import { inputDefaultColor } from '../types/constants';
import { IGarage, IProviderProps, TWinner } from '../types/interfaces';

export const GarageContext = React.createContext<IGarage | null>(null);

export function GarageProvider({ children }: IProviderProps) {
  const [garagePage, setGaragePage] = useState(1);
  const [winnersPage, setWinnersPage] = useState(1);
  const [winners, setWinners] = useState<TWinner[]>([]);
  const [currentCar, setCurrentCar] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [colorInput, setColorInput] = useState(inputDefaultColor);
  const [isAllStarted, setIsAllStarted] = useState(false);

  const context = {
    garagePage,
    setGaragePage,
    winnersPage,
    setWinnersPage,
    winners,
    setWinners,
    currentCar,
    setCurrentCar,
    nameInput,
    setColorInput,
    colorInput,
    setNameInput,
    isAllStarted,
    setIsAllStarted,
  };

  return (
    <GarageContext.Provider value={useMemo(() => context, [context])}>
      { children }
    </GarageContext.Provider>
  );
}
