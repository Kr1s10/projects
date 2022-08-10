import React, {
  useContext, useEffect, useState,
} from 'react';
import { selectedClass } from '../../types/constants';
import { ICar, TWinner } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';
import WinnersServise from '../../utils/WinnersServise';
import { GarageContext } from '../context/GarageContext';
import useEngine from '../hooks/UseEngine';
import CarSvg from '../svg/CarSvg';

interface ICarProps {
  item: ICar;
  isFull: boolean;
  fetchCars: () => void;
  setWinners: React.Dispatch<React.SetStateAction<TWinner[]>>;
}

function Car({
  item, isFull, fetchCars, setWinners,
}: ICarProps) {
  const { id, name, color } = item;
  const {
    currentCar, setCurrentCar, setNameInput, setColorInput, isAllStarted,
  } = useContext(GarageContext);
  const {
    car, flag, startEngine, stopEngine,
  } = useEngine(id!);
  const [removeBtn, setRemoveBtn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const removeCar = async () => {
    setRemoveBtn(true);
    await CarsServise.deleteCar(id as number);
    await WinnersServise.deleteWinner(id as number);
    fetchCars();
    setRemoveBtn(false);
  };

  const changeCar = () => {
    setCurrentCar(id!);
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
    } else if (!isAllStarted) {
      stopEngineHandler();
    }
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

export default Car;
