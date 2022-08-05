import React from 'react';
import Controls from '../components/Controls';
import Form from '../components/Form';
import Garage from '../components/Garage';

function GaragePage() {
  return (
    <div className="garageView">
      <Form action="Create" />
      <Form action="Update" />
      <Controls />
      <Garage />
    </div>
  );
}

export default GaragePage;
