import React, { Dispatch, useMemo, useState } from 'react';

interface IGarage {
  garagePage: number;
  setGaragePage: Dispatch<number>;
  winnersPage: number;
  setWinnersPage: Dispatch<number>;
  currentCar: number;
  setCurrentCar: Dispatch<number>;
  nameInput: string;
  setNameInput: Dispatch<string>;
  colorInput: string;
  setColorInput: Dispatch<string>;
}

export const GarageContext = React.createContext<IGarage>({
  garagePage: 1,
  setGaragePage: () => {},
  winnersPage: 1,
  setWinnersPage: () => {},
  currentCar: 0,
  setCurrentCar: () => {},
  nameInput: '',
  setNameInput: () => {},
  colorInput: '',
  setColorInput: () => {},
});

export function GarageState({ children }: { children: React.ReactNode }) {
  const [garagePage, setGaragePage] = useState(1);
  const [winnersPage, setWinnersPage] = useState(1);
  const [currentCar, setCurrentCar] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [colorInput, setColorInput] = useState('#ffffff');

  const context = {
    garagePage,
    setGaragePage,
    winnersPage,
    setWinnersPage,
    currentCar,
    setCurrentCar,
    nameInput,
    setColorInput,
    colorInput,
    setNameInput,
  };

  return (
    <GarageContext.Provider value={useMemo(() => context, [context])}>
      { children }
    </GarageContext.Provider>
  );
}
