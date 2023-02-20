import React from 'react';
import logo from './logo.svg';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
// import './css/bootstrap/bootstrap.min.css';
import { Home } from './pages/Home';
import About from './pages/About';
import Sweets from './pages/Sweets';
import Sweet from './pages/Sweet';


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/sweets" element={<Sweets/>}></Route>
      <Route path="/sweet/:id" element={<Sweet/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
