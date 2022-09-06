import React, { useContext, useEffect } from 'react';
import { FormText, inputDefaultColor } from '../../types/constants';
import CarsServise from '../../utils/CarsService';
import { GarageContext } from '../../context/GarageContext';
import { IFormProps, IGarage } from '../../types/interfaces';

export default function Form({ updateState } : IFormProps) {
  const {
    currentCar, setCurrentCar, nameInput: name, setNameInput, colorInput: color, setColorInput,
  } = useContext(GarageContext) as IGarage;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentCar) {
      await CarsServise.updateCar(currentCar, { name, color });
    } else {
      await CarsServise.createCar({ name, color });
    }
    updateState();
    setNameInput('');
    setColorInput(inputDefaultColor);
    setCurrentCar(0);
  };

  const inputNameHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(value);
  };

  const inputColorHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setColorInput((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (currentCar) {
      setNameInput(name);
      setColorInput(color);
    }
  }, [currentCar, name, color]);

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        className="form__input"
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="off"
        value={name}
        onChange={inputNameHandler}
      />
      <input
        className="form__input"
        id="color"
        type="color"
        value={color}
        autoComplete="off"
        onInput={inputColorHandler}
      />
      <button
        className="form__btn"
        type="submit"
      >
        {currentCar ? FormText.update : FormText.create}
      </button>
    </form>
  );
}
