import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Table from './components/Table/Table';

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
