import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../components/context/GarageContext';
import { PageState } from '../components/context/PageContext';
import Pagination from '../components/Pagination';
import Table from '../components/winners/WinnersTable';
import { IWinnerWithCar } from '../types/interfaces';
import WinnersServise from '../utils/WinnersServise';

function WinnersPage() {
  const { winnersPage, changeWinnersPage } = useContext(GarageContext);
  const [winners, setWinners] = useState<IWinnerWithCar[]>([]);
  const [count, setCount] = useState(0);

  const fetchWinners = async () => {
    const { data, totalCount } = await WinnersServise.getWinners(winnersPage);
    setWinners(data);
    setCount(totalCount);
  };

  useEffect(() => {
    fetchWinners();
  }, []);
  return (
    <main className="wrapper main winners">
      <h1 className="main-title">
        Winners (
        {count}
        )
      </h1>
      <h2 className="page-title">
        Page #
        {winnersPage}
      </h2>
      <Table data={winners} />
      <PageState>
        <Pagination
          page={winnersPage}
          change={changeWinnersPage}
          updateState={fetchWinners}
          count={count}
          limit={10}
        />
      </PageState>
    </main>
  );
}

export default WinnersPage;
