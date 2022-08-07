import React, { useMemo, useState } from 'react';

interface IGarage {
  garagePage: number;
  changeGaragePage: (value: number) => void;
  winnersPage: number;
  changeWinnersPage: (value: number) => void;
}

export const GarageContext = React.createContext<IGarage>({
  garagePage: 1,
  winnersPage: 1,
  changeGaragePage: () => {},
  changeWinnersPage: () => {},
});

export function GarageState({ children }: { children: React.ReactNode }) {
  const [garagePage, setGaragePage] = useState(1);
  const [winnersPage, setWinnersPage] = useState(1);
  const changeGaragePage = (value: number) => setGaragePage(value);
  const changeWinnersPage = (value: number) => setWinnersPage(value);

  const context = {
    garagePage,
    changeGaragePage,
    winnersPage,
    changeWinnersPage,
  };

  return (
    <GarageContext.Provider value={useMemo(() => context, [context])}>
      { children }
    </GarageContext.Provider>
  );
}
