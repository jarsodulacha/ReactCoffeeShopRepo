import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NewOrder from './NewOrder';
import OrderList from './OrderList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-order" element={<NewOrder />} /> {/* Ensure this is correct */}
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
    </Router>
  );
};

export default App;
