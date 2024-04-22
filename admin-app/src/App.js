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
import Couponlist from './pages/Counponlist';
import AddCounpon from './pages/Addcounpon';
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
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<DetailOrder />} />
          <Route path="orders" element={<Orders title="Orders" />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product-list/:id" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCounpon />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="category-list/:id" element={<Addcat />} />
          <Route path="coupon-list/:id" element={<AddCounpon />} />
          <Route path="category" element={<Addcat />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
