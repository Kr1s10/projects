import React, {
  useContext, useEffect, useState,
} from 'react';
import { selectedClass } from '../../types/constants';
import { ICarProps, IGarage } from '../../types/interfaces';
import CarsServise from '../../utils/CarsService';
import WinnersServise from '../../utils/WinnersService';
import { GarageContext } from '../../context/GarageContext';
import useEngine from '../../hooks/UseEngine';
import CarSvg from '../../assets/svg/CarSvg';

export default function Car({
  item: { id, name, color }, isFull, fetchCars, setWinners,
}: ICarProps) {
  const carId = id as number;
  const {
    currentCar, setCurrentCar, setNameInput, setColorInput, isAllStarted,
  } = useContext(GarageContext) as IGarage;
  const {
    car, flag, startEngine, stopEngine,
  } = useEngine(carId);
  const [removeBtn, setRemoveBtn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const removeCar = async () => {
    setRemoveBtn(true);
    await CarsServise.deleteCar(carId);
    await WinnersServise.deleteWinner(carId);
    fetchCars();
    setRemoveBtn(false);
  };

  const changeCar = () => {
    setCurrentCar(carId);
    setNameInput(name);
    setColorInput(color);
  };

  const startEngineHandler = async () => {
    setIsStarted(true);
    startEngine(setWinners);
  };

  const stopEngineHandler = async () => {
    stopEngine();
    setIsStarted(false);
    if (isFull) setWinners([]);
  };

  useEffect(() => {
    if (isAllStarted) {
      startEngineHandler();
      return;
    }

    stopEngineHandler();
  }, [isAllStarted]);

  return (
    <li className="garage-list__item">
      <div className="car-controls">
        <button className={`car-controls__btn ${id === currentCar ? selectedClass : ''}`} id="select" type="button" onClick={changeCar}>select</button>
        <button className="car-controls__btn" id="remove" type="button" onClick={removeCar} disabled={removeBtn}>remove</button>
        <h3 className="car-title">{name}</h3>
      </div>
      <div className="car-pad">
        <div className="engine-controls">
          <button className="engine-controls__btn" id="start" type="button" onClick={startEngineHandler} disabled={isStarted}>A</button>
          <button className="engine-controls__btn" id="stop" type="button" onClick={stopEngineHandler} disabled={!isStarted}>B</button>
        </div>
        <div className="road">
          <div ref={car} className="car">
            <CarSvg color={color} />
          </div>
          <img ref={flag} className="flag" src="./flag.png" alt="flag" />
        </div>
      </div>
    </li>
  );
}
