import React, { useContext, useEffect, useState } from 'react';
import { milliseconds } from '../../types/constants';
import { IGarage, IGarageProps, TWinner } from '../../types/interfaces';
import CarsServise from '../../utils/CarsService';
import { GarageContext } from '../../context/GarageContext';
import Car from './Car';

export default function Garage({
  cars, count, fetchCars,
}: IGarageProps) {
  const { garagePage } = useContext(GarageContext) as IGarage;
  const [isFull, setIsFull] = useState(false);
  const [winners, setWinners] = useState<TWinner[]>([]);
  const [winner, setWinner] = useState<TWinner>();
  const [modal, setModal] = useState(false);

  const getWinner = async () => {
    const currentWinner = winners[0];
    const { id, winsTime } = currentWinner;
    const { name } = await CarsServise.getCar(id);
    setWinner({ id: name, winsTime });
  };

  const closeModal = () => setModal(false);

  useEffect(() => {
    if (winners.length) {
      setIsFull(true);
      getWinner();
      setModal(true);
    }

    setIsFull(false);
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
      /*  eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
      <div className="message-wrapper" onClick={closeModal}>
        <p className="message">
          {winner && `${winner.id} went first [${(winner.winsTime / milliseconds).toFixed(2)}s]`}
        </p>
      </div>
      )}
    </div>
  );
}
