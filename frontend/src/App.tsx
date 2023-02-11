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


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
