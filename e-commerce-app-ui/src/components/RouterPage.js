import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Orders from './users/Orders';
import Dashboard from './users/Dashboard';
import Profile from './users/Profile';
import Cart from './users/Cart';
import ProductDisplay from './users/ProductDisplay';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import CustomerList from './admin/CustomerList';
import Product from './admin/Product';
 
function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/registration" element={ <Registration /> } />
                <Route path="/myorders" element={ <Orders /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/cart" element={ <Cart /> } />
                <Route path="/products" element={ <ProductDisplay /> } />
                <Route path="/admindashboard" element={ <AdminDashboard /> } />
                <Route path="/adminorders" element={ <AdminOrders /> } />
                <Route path="/customers" element={ <CustomerList /> } />
                <Route path="/product" element={ <Product /> } />
            </Routes>
        </Router>        
    );
}

export default RouterPage;