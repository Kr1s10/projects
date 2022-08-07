import React from 'react';
import { IWinnerWithCar } from '../../types/interfaces';
import Winner from './Winner';

function Table({ data }: { data: IWinnerWithCar[] }) {
  return (
    <table className="table">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th>Wins</th>
        <th>Best time (s)</th>
      </thead>
      <tbody>
        {data.map((winner, idx) => <Winner item={winner} number={idx} key={winner.id} />)}
      </tbody>
    </table>
  );
}

export default Table;
