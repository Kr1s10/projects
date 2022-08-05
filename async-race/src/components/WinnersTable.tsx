import React from 'react';
import Winner from './Winner';

function Table() {
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
        <Winner />
      </tbody>
    </table>
  );
}

export default Table;
