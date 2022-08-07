import React, { useContext, useState } from 'react';
import { ICar } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';
import WinnersServise from '../../utils/WinnersServise';
import { GarageContext } from '../context/GarageContext';
import CarSvg from '../svg/CarSvg';

interface ICarProps {
  item: ICar;
  fetchCars: () => void;
}

function Car({ item, fetchCars }: ICarProps) {
  const { currentCar, setCurrentCar } = useContext(GarageContext);
  const [removeBtn, setRemoveBtn] = useState(false);

  const removeCar = async () => {
    setRemoveBtn(true);
    await CarsServise.deleteCar(item.id as number);
    await WinnersServise.deleteWinner(item.id as number);
    fetchCars();
    setRemoveBtn(false);
  };

  const changeCar = () => {
    setCurrentCar(item);
  };

  return (
    <li className="garage-list__item">
      <div className="car-controls">
        <button className={`car-controls__btn ${item.id === currentCar.id ? 'selected' : ''}`} id="select" type="button" onClick={changeCar}>select</button>
        <button className="car-controls__btn" id="remove" type="button" onClick={removeCar} disabled={removeBtn}>remove</button>
        <h3 className="car-title">{item.name}</h3>
      </div>
      <div className="car-pad">
        <div className="engine-controls">
          <button className="engine-controls__btn" id="start" type="button">A</button>
          <button className="engine-controls__btn" id="stop" type="button">B</button>
        </div>
        <div className="road">
          <CarSvg color={item.color} />
          <img className="flag" src="./flag.png" alt="flag" />
        </div>
      </div>
    </li>
  );
}

export default Car;
