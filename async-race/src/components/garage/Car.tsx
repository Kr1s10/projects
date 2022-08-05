import React from 'react';
import CarSvg from '../svg/CarSvg';

function Car() {
  return (
    <li className="garage-list__item">
      <div className="car-controls">
        <button className="car-controls__btn" id="select" type="button">select</button>
        <button className="car-controls__btn" id="remove" type="button">remove</button>
        <h3 className="car-title">Audi</h3>
      </div>
      <div className="car-pad">
        <div className="engine-controls">
          <button className="engine-controls__btn" id="start" type="button">A</button>
          <button className="engine-controls__btn" id="stop" type="button">B</button>
        </div>
        <div className="road">
          <CarSvg />
          <img className="flag" src="./flag.png" alt="flag" />
        </div>
      </div>
    </li>
  );
}

export default Car;
