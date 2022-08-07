import React, { useContext, useEffect } from 'react';
import { ICar } from '../../types/interfaces';
import { GarageContext } from '../context/GarageContext';
import Car from './Car';

interface IGarage {
  cars: ICar[];
  count: number;
  currCar: ICar;
  selectBtn: boolean;
  addCurrCar: (car: ICar) => void;
  updateState: () => void;
  updateForm: (val: boolean) => void;
  setSelectBtn: (val: boolean) => void;
}

function Garage({
  cars, count, currCar, selectBtn, setSelectBtn, addCurrCar, updateState, updateForm,
}: IGarage) {
  const { garagePage } = useContext(GarageContext);

  useEffect(() => {
    updateState();
  }, []);

  return (
    <div className="garage">
      <h1 className="main-title">
        Garage (
        {count}
        )
      </h1>
      <h2 className="page-title">
        Page #
        {garagePage}
      </h2>
      <ul className="garage-list">
        { cars.map((car) => (
          <Car
            item={car}
            currCar={currCar}
            addCurrCar={addCurrCar}
            updateState={updateState}
            updateForm={updateForm}
            selectBtn={selectBtn}
            setSelectBtn={setSelectBtn}
            key={car.id}
          />
        ))}
      </ul>
      <div className="message-wrapper">
        <p className="message" />
      </div>
    </div>
  );
}

export default Garage;
