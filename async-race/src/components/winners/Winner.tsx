import React from 'react';
import { IWinnerProps } from '../../types/interfaces';
import CarSvg from '../../assets/svg/CarSvg';

export default function Winner({ item: { car, wins, time }, number }: IWinnerProps) {
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
