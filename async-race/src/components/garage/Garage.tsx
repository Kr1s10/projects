/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { ICar, TWinner } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';
import { GarageContext } from '../context/GarageContext';
import Car from './Car';

interface IGarage {
  cars: ICar[];
  count: number;
  fetchCars: () => void;
}

function Garage({
  cars, count, fetchCars,
}: IGarage) {
  const { garagePage } = useContext(GarageContext);
  const [isFull, setIsFull] = useState(false);
  const [winners, setWinners] = useState<TWinner[]>([]);
  const [winner, setWinner] = useState<TWinner>();
  const [modal, setModal] = useState(false);

  const getWinner = async () => {
    const winCar = await CarsServise.getCar(winners[0].id);
    setWinner({
      id: winCar.name,
      winsTime: winners[0].winsTime,
    });
  };

  useEffect(() => {
    if (winners.length) {
      setIsFull(true);
      if (winners.length === 1) {
        getWinner();
        setModal(true);
      }
    } else setIsFull(false);
  }, [winners]);

  return (
    <div className="garage">
      <h1 className="main-title">
        Garage (
        {count}
        )
      </h1>
      <h2 className="page-title">
        Page #
        {garagePage}
      </h2>
      <ul className="garage-list">
        { cars.map((car) => (
          <Car
            item={car}
            fetchCars={fetchCars}
            isFull={isFull}
            setWinners={setWinners}
            key={car.id}
          />
        ))}
      </ul>
      {modal && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div className="message-wrapper" onClick={() => setModal(false)}>
        <p className="message">
          {winner?.id}
          {' '}
          went first [
          {((winner?.winsTime as number) / 1000).toFixed(2)}
          s]
        </p>
      </div>
      )}
    </div>
  );
}

export default Garage;
