import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GetQuote from './pages/GetQuote';
import CardCalculator from './components/CardCalculator';
import BestMethodCalculator from './pages/BestMethodCalculator';
import PSALookup from './pages/PSALookup';
import PSABatchLookup from './pages/PSABatchLookup';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="best-method" element={<BestMethodCalculator />} />
        <Route path="calculator" element={<CardCalculator />} />
        <Route path="quote" element={<GetQuote />} />
        <Route path="psa-lookup" element={<PSALookup />} />
        <Route path="psa-batch-lookup" element={<PSABatchLookup />} />
      </Route>
    </Routes>
  );
};

export default App;