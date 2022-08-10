import React from 'react';
import { IWinnerWithCar } from '../../types/interfaces';
import CarSvg from '../svg/CarSvg';

function Winner({ item, number }: { item: IWinnerWithCar, number: number }) {
  const { car, wins, time } = item;
  return (
    <tr>
      <td>{number}</td>
      <td className="car-ceil">
        <div className="car">
          <CarSvg color={car.color} />
        </div>
      </td>
      <td>{car.name}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
}

export default Winner;
