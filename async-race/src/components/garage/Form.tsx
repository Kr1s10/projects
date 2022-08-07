import React, { useContext, useEffect, useState } from 'react';
import CarsServise from '../../utils/CarsServise';
import { GarageContext } from '../context/GarageContext';

interface IForm {
  updateState: () => void;
}

function Form({ updateState } : IForm) {
  const { currentCar, initStateCar, setCurrentCar } = useContext(GarageContext);
  const [nameInput, setNameInput] = useState('');
  const [colorInput, setColorInput] = useState('#ffffff');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentCar.id) {
      await CarsServise.updateCar(currentCar.id as number, { name: nameInput, color: colorInput });
    } else {
      await CarsServise.createCar({ name: nameInput, color: colorInput });
    }
    updateState();
    setNameInput('');
    setColorInput('#ffffff');
    setCurrentCar(initStateCar);
  };

  useEffect(() => {
    if (currentCar.id) {
      setNameInput(currentCar.name);
      setColorInput(currentCar.color);
    }
  }, [currentCar]);

  useEffect(() => {
    setCurrentCar({ id: currentCar.id, name: nameInput, color: colorInput });
  }, [nameInput, colorInput]);

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        className="form__input"
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="off"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
          // setCurrentCar({ id: currentCar.id, name: nameInput, color: currentCar.color });
        }}
      />
      <input
        className="form__input"
        id="color"
        type="color"
        value={colorInput}
        autoComplete="off"
        onInput={(e) => {
          setColorInput((e.target as HTMLInputElement).value);
          // setCurrentCar({ id: currentCar.id, name: currentCar.name, color: colorInput });
        }}
      />
      <button
        className="form__btn"
        type="submit"
      >
        {currentCar.id ? 'update' : 'create'}
      </button>
    </form>
  );
}

export default Form;
