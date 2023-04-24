
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
import Order from './pages/Order';
import Manager from './pages/Manager';
import ManagerOrder from './pages/ManagerOrder';
import ManagerEdit from './pages/ManagerEdit';
import OrderResult from './pages/OrderResult';
import Contact from './pages/Contact';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';








const  App = () => {
  const dispatch = useDispatch();

  const store = useSelector(state => state.GetAuthStore)

  useEffect( () => {
    if(localStorage.getItem('token')){
      // store.checkAuth()
     
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
      <Route path="/orderresult" element={<OrderResult/>}></Route>
      <Route path="/order" element={<Order/>}></Route>
      <Route path='/managerorder/:id/:statusId' element={<ManagerOrder/>}></Route>
      <Route path='/manageredit/:id' element={<ManagerEdit/>}></Route>
      <Route path='/manager' element={<Manager/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>


      
      
            


    </Routes>
    {/* <button onClick={(e)=>{console.log(store)}}>app</button> */}
    
   </BrowserRouter>

   
  );
}

export default App;
