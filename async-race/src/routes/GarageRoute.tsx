import React from 'react';
import Controls from '../components/garage/Controls';
import Form from '../components/garage/Form';
import Garage from '../components/garage/Garage';
import Pagination from '../components/Pagination';

function GaragePage() {
  return (
    <div className="garageView">
      <Form action="Create" />
      <Form action="Update" />
      <Controls />
      <Garage />
      <Pagination />
    </div>
  );
}

export default GaragePage;
