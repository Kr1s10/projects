import React, { useContext } from 'react';
import { ICar } from '../../types/interfaces';
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
            key={car.id}
          />
        ))}
      </ul>
      <div className="message-wrapper">
        <p className="message" />
      </div>
    </div>
  );
}

export default Garage;
