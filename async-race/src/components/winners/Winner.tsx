import React from 'react';
import { IWinnerWithCar } from '../../types/interfaces';
import CarSvg from '../svg/CarSvg';

function Winner({ item, number }: { item: IWinnerWithCar, number: number }) {
  return (
    <tr>
      <td>{number}</td>
      <td className="car-ceil">
        <div className="car">
          <CarSvg color={item.car.color} />
        </div>
      </td>
      <td>{item.car.name}</td>
      <td>{item.wins}</td>
      <td>{item.time}</td>
    </tr>
  );
}

export default Winner;
