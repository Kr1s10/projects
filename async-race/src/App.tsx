import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import GaragePage from './routes/GarageRoute';
import WinnersPage from './routes/WinnersRoute';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<GaragePage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
