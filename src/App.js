import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Table from './components/Table';

const App = () => {
  return (
    <Router>
      <div className="App">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
