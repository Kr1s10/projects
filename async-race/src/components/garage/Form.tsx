import React, { useContext, useEffect } from 'react';
import { FormText, inputDefaultColor } from '../../types/constants';
import CarsServise from '../../utils/CarsServise';
import { GarageContext } from '../context/GarageContext';

interface IForm {
  updateState: () => void;
}

function Form({ updateState } : IForm) {
  const {
    currentCar, setCurrentCar, nameInput, setNameInput, colorInput, setColorInput,
  } = useContext(GarageContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentCar) {
      await CarsServise.updateCar(currentCar as number, { name: nameInput, color: colorInput });
    } else {
      await CarsServise.createCar({ name: nameInput, color: colorInput });
    }
    updateState();
    setNameInput('');
    setColorInput(inputDefaultColor);
    setCurrentCar(0);
  };

  useEffect(() => {
    if (currentCar) {
      setNameInput(nameInput);
      setColorInput(colorInput);
    }
  }, [currentCar]);

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        className="form__input"
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="off"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <input
        className="form__input"
        id="color"
        type="color"
        value={colorInput}
        autoComplete="off"
        onInput={(e) => setColorInput((e.target as HTMLInputElement).value)}
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

export default Form;
