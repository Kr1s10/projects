import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../components/context/GarageContext';
import Controls from '../components/garage/Controls';
import Form from '../components/garage/Form';
import Garage from '../components/garage/Garage';
import Pagination from '../components/Pagination';
import { ICar } from '../types/interfaces';
import CarsServise from '../utils/CarsServise';

function GaragePage() {
  const { garagePage, setGaragePage } = useContext(GarageContext);
  const [cars, setCars] = useState<ICar[]>([]);
  const [count, setCount] = useState(0);

  const fetchCars = async () => {
    const { data, totalCount } = await CarsServise.getCars(garagePage);
    setCars(data);
    setCount(totalCount);
  };

  useEffect(() => {
    fetchCars();
  }, [garagePage]);

  return (
    <main className="wrapper main">
      <Form
        updateState={fetchCars}
      />
      <Controls updateState={fetchCars} />
      <Garage
        cars={cars}
        count={count}
        fetchCars={fetchCars}
      />
      <Pagination
        page={garagePage}
        change={setGaragePage}
        updateState={fetchCars}
        limit={7}
        length={cars.length}
      />
    </main>
  );
}

export default GaragePage;
