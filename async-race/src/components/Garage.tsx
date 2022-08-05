import React from 'react';
import Car from './Car';
import Pagination from './Pagination';

function Garage() {
  return (
    <div className="garage">
      <h1 className="main-title">Garage (1)</h1>
      <h2 className="page-title">Page #1</h2>
      <ul className="garage-list">
        <Car />
      </ul>
      <div className="message-wrapper">
        <p className="message" />
      </div>
      <Pagination />
    </div>
  );
}

export default Garage;
