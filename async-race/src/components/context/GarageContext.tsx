import React, { Dispatch, useMemo, useState } from 'react';
import { TWinner } from '../../types/interfaces';

interface IGarage {
  garagePage: number;
  setGaragePage: Dispatch<number>;
  winnersPage: number;
  setWinnersPage: Dispatch<number>;
  winners: TWinner[];
  setWinners: Dispatch<TWinner[]>
  currentCar: number;
  setCurrentCar: Dispatch<number>;
  nameInput: string;
  setNameInput: Dispatch<string>;
  colorInput: string;
  setColorInput: Dispatch<string>;
  isAllStarted: boolean;
  setIsAllStarted: Dispatch<boolean>;
}

export const GarageContext = React.createContext<IGarage>({
  garagePage: 1,
  setGaragePage: () => {},
  winnersPage: 1,
  setWinnersPage: () => {},
  winners: [],
  setWinners: () => {},
  currentCar: 0,
  setCurrentCar: () => {},
  nameInput: '',
  setNameInput: () => {},
  colorInput: '',
  setColorInput: () => {},
  isAllStarted: false,
  setIsAllStarted: () => {},
});

export function GarageState({ children }: { children: React.ReactNode }) {
  const [garagePage, setGaragePage] = useState(1);
  const [winnersPage, setWinnersPage] = useState(1);
  const [winners, setWinners] = useState<TWinner[]>([]);
  const [currentCar, setCurrentCar] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [colorInput, setColorInput] = useState('#ffffff');
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
