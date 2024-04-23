import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Orders from './pages/Order';
import Customers from './pages/Customers';
import Productlist from './pages/Productlist';
import Categorylist from './pages/Categorylist';
import Discountlist from './pages/Discountlist';
import Adddiscount from './pages/Adddiscount';
import Addcat from './pages/Addcat';
import Addproduct from './pages/Addproduct';
import DetailOrder from './pages/DetailOrder';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="order/:id" element={<DetailOrder />} />
          <Route path="orders" element={<Orders title="Orders" />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product-list/:id" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="discount-list" element={<Discountlist />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="category-list/:id" element={<Addcat />} />
          <Route path="discount-list/:id" element={<Adddiscount />} />
          <Route path="discount" element={<Adddiscount />} />
          <Route path="category" element={<Addcat />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
