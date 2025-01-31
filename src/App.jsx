import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GetQuote from './pages/GetQuote';
import CardCalculator from './components/CardCalculator';
import BestMethodCalculator from './pages/BestMethodCalculator';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/best-method" element={<BestMethodCalculator />} />
        <Route path="/calculator" element={<CardCalculator />} />
        <Route path="/quote" element={<GetQuote />} />
      </Route>
    </Routes>
  );
};

export default App;