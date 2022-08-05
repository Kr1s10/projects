import React from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/WinnersTable';

function WinnersPage() {
  return (
    <div className="winnersView">
      <h1 className="main-title">Winners (1)</h1>
      <h2 className="page-title">Page #1</h2>
      <Table />
      <Pagination />
    </div>
  );
}

export default WinnersPage;
