import React from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import "./managerHeaderStyle.css";
import { logout } from '../redux/auth-reducer';
import { generateSitemap } from '../functions/Sitemap';


const ManagerHeader = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  function goBackPage() {
    navigate(-1); // navigate back one page in the history
  }

  const gologout = (e) => {
    e.preventDefault();
    logout(dispatch);
    navigate("/");
  }


  <button onClick={goBackPage}>назад</button>

  return (
    <div className='headerManagerHeader'>
      <nav className='navManagerHeader' >
        <div className="logo">My App</div>
        <ul>
          <li><button onClick={(e)=> generateSitemap(dispatch)}>siteMap</button></li>
          <li><button onClick={goBackPage}>назад</button></li>
          <li><button onClick={gologout}>выход</button></li>
          
          
        </ul>
      </nav>
    </div>
  );
};

export default ManagerHeader;