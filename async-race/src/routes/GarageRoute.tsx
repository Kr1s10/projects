import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../components/context/GarageContext';
import Controls from '../components/garage/Controls';
import Form from '../components/garage/Form';
import Garage from '../components/garage/Garage';
import useCurrCar from '../components/hooks/UseCurrCar';
import useFetchCars from '../components/hooks/UseFetch';
import Pagination from '../components/Pagination';

function GaragePage() {
  const { garagePage, changeGaragePage } = useContext(GarageContext);
  const { cars, count, fetchCars } = useFetchCars();
  const { car, addCar, resetCar } = useCurrCar();
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdeateForm] = useState(true);
  const [selectBtn, setSelectBtn] = useState(false);

  const changeForm = (val: boolean) => {
    setUpdeateForm(val);
    setCreateForm(!val);
  };
  const changeSelectBtn = (val: boolean) => setSelectBtn(val);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <main className="wrapper main">
      <Form
        action="create"
        car={car}
        disabled={createForm}
        updateState={fetchCars}
        updateForm={changeForm}
        reset={resetCar}
        selectBtn={selectBtn}
        setSelectBtn={changeSelectBtn}
      />
      <Form
        action="update"
        car={car}
        disabled={updateForm}
        updateState={fetchCars}
        updateForm={changeForm}
        reset={resetCar}
        selectBtn={selectBtn}
        setSelectBtn={changeSelectBtn}
      />
      <Controls updateState={fetchCars} />
      <Garage
        cars={cars}
        count={count}
        currCar={car}
        addCurrCar={addCar}
        updateState={fetchCars}
        updateForm={changeForm}
        selectBtn={selectBtn}
        setSelectBtn={changeSelectBtn}
      />
      <Pagination
        page={garagePage}
        change={changeGaragePage}
        updateState={fetchCars}
        count={count}
        limit={7}
      />
    </main>
  );
}

export default GaragePage;
