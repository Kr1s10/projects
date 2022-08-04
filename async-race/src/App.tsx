import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import GaragePage from './routes/GarageRoute';
import WinnersPage from './routes/WinnersRoute';

function App() {
  // useEffect(() => {
  //   GaragePage();
  // }, []);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<GaragePage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
    </>
  );
}

export default App;
