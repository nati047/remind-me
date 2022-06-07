import React from "react";
import axios from "axios";
import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomeLayout from './components/HomeLayout'
import { Carousel } from './components/HomeLayout'
import Login from './components/Login'
import Register from './components/Register'
import Tasks from "./components/Tasks";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  // add token to all api requests
  axios.interceptors.request.use(async function (config) {
    const token = await localStorage.getItem('access-token');
    config.headers['x-access-token'] = token;
    return config;
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} >
          <Route index element={<Carousel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
    
  );
}

export default App;

