import React, { useState } from 'react';
import { ICar } from '../../types/interfaces';
import CarsServise from '../../utils/CarsServise';
import CarSvg from '../svg/CarSvg';

interface ICarProps {
  item: ICar;
  updateState: () => void;
  currCar: ICar;
  selectBtn: boolean;
  addCurrCar: (car: ICar) => void;
  updateForm: (val: boolean) => void;
  setSelectBtn: (val: boolean) => void;
}

function Car({
  item, currCar, selectBtn, setSelectBtn, addCurrCar, updateState, updateForm,
}: ICarProps) {
  const [removeBtn, setRemoveBtn] = useState(false);

  const removeCar = async () => {
    setRemoveBtn(true);
    await CarsServise.deleteCar(item.id as number);
    updateState();
    setRemoveBtn(false);
  };

  const changeCar = () => {
    setSelectBtn(true);
    updateForm(false);
    addCurrCar(item);
  };

  return (
    <li className="garage-list__item">
      <div className="car-controls">
        <button className={`car-controls__btn ${item.id === currCar.id ? 'selected' : ''}`} id="select" type="button" onClick={changeCar} disabled={selectBtn}>select</button>
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
