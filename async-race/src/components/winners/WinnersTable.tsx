import React from 'react';
import { IWinnersTableProps } from '../../types/interfaces';
import Winner from './Winner';

export default function WinnersTable({ data }: IWinnersTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time (s)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((winner, idx) => <Winner item={winner} number={idx + 1} key={winner.id} />)}
      </tbody>
    </table>
  );
}
