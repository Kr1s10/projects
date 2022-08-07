import React, { useState } from 'react';
import CarsServise from '../../utils/CarsServise';
import generateRandomCars from '../helpers/GenerateRandomCars';

interface IControls {
  updateState: () => void;
}

function Controls({ updateState }: IControls) {
  const [generateBtn, setGenerateBtn] = useState(false);

  const generateCars = async () => {
    setGenerateBtn(true);
    const cars = generateRandomCars();
    await Promise.all(cars.map(CarsServise.createCar));
    updateState();
    setGenerateBtn(false);
  };

  return (
    <div className="controls">
      <button className="controls__btn" id="race" type="button">Race</button>
      <button className="controls__btn" id="reset" type="button">Reset</button>
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

export default Controls;
