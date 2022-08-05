import React from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/winners/WinnersTable';

function WinnersPage() {
  return (
    <main className="wrapper main winners">
      <h1 className="main-title">Winners (1)</h1>
      <h2 className="page-title">Page #1</h2>
      <Table />
      <Pagination />
    </main>
  );
}

export default WinnersPage;
