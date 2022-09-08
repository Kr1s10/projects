import React, { useContext, useState } from 'react';
import { IControlsProps, IGarage } from '../../types/interfaces';
import CarsServise from '../../utils/CarsService';
import { GarageContext } from '../../context/GarageContext';
import generateRandomCars from '../../helpers/GenerateRandomCars';

export default function Controls({ updateState }: IControlsProps) {
  const [generateBtn, setGenerateBtn] = useState(false);
  const { isAllStarted, setIsAllStarted } = useContext(GarageContext) as IGarage;

  const generateCars = async () => {
    setGenerateBtn(true);
    const cars = generateRandomCars();
    await Promise.all(cars.map(CarsServise.createCar));
    updateState();
    setGenerateBtn(false);
  };

  return (
    <div className="controls">
      <button className="controls__btn" id="race" type="button" disabled={isAllStarted} onClick={() => setIsAllStarted(true)}>Race</button>
      <button className="controls__btn" id="reset" type="button" disabled={!isAllStarted} onClick={() => setIsAllStarted(false)}>Reset</button>
      <button
        className="controls__btn"
        id="generate"
        type="button"
        onClick={generateCars}
        disabled={generateBtn}
      >
        Generate
      </button>
    </div>
  );
}
