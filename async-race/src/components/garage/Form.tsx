import React, { useState } from 'react';
import { ICar } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';

interface IForm {
  action: string;
  disabled: boolean;
  car: ICar;
  selectBtn: boolean;
  updateState: () => void;
  updateForm: (val: boolean) => void;
  reset: () => void,
  setSelectBtn: (val: boolean) => void;
}

function Form({
  action, disabled, selectBtn, setSelectBtn, updateState, updateForm, reset, car = { name: '', color: '' },
} : IForm) {
  const [nameInput, setNameInput] = useState('');
  const [colorInput, setColorInput] = useState('#ffffff');

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (action === 'create') {
      await CarsServise.createCar({ name: nameInput, color: colorInput });
    } else {
      await CarsServise.updateCar(car.id as number, { name: nameInput, color: colorInput });
    }
    updateForm(!disabled);
    updateState();
    setNameInput('');
    setColorInput('#ffffff');
    reset();
    setSelectBtn(false);
  };

  return (
    <form className="form" id={action} onSubmit={submitHandler}>
      <input
        className="form__input"
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="off"
        value={nameInput}
        disabled={disabled}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <input
        className="form__input"
        id="color"
        type="color"
        value={colorInput}
        autoComplete="off"
        disabled={disabled}
        onInput={(e) => setColorInput((e.target as HTMLInputElement).value)}
      />
      <button
        className="form__btn"
        type="submit"
        disabled={disabled}
      >
        {action}
      </button>
    </form>
  );
}

export default Form;
