
import React, { useEffect } from 'react';
import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuth } from './redux/auth-reducer';
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
import Login from './pages/Login';
import Basket from './pages/Basket';
import Cabinet from './pages/Cabinet';







const  App = () => {
  const dispatch = useDispatch();

  const store = useSelector(state => state.GetAuthStore)

  useEffect( () => {
    if(localStorage.getItem('token')){
      // store.checkAuth()
      console.log("useEffectAPP");
      checkAuth(dispatch)      
    }    

   


  },[store.isAuth])



  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/sweets" element={<Sweets/>}></Route>
      <Route path="/sweet/:id" element={<Sweet/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/cabinet" element={<Cabinet/>}></Route>
      <Route path="/basket" element={<Basket/>}></Route>

      


    </Routes>
    <button onClick={(e)=>{console.log(store)}}>app</button>
   </BrowserRouter>

   
  );
}

export default App;
