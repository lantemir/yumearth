import React, { useState, useEffect } from 'react'
import "../css/pages_style/LoginStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as bases from '../components/bases';
import "../css/pages_style/LoginStyle.css";
// import Slider from './Slider';
import { Link, NavLink } from 'react-router-dom';
import {requestLogin} from '../redux/auth-reducer';

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const store = useSelector(state => state.GetAuthStore)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (store.isAuth) {   
            
            console.log("store.isAuth")
            console.log(store.isAuth)
            navigate("/");
        }
      }, [store.isAuth]);

    

    const showState = (e) => {
         e.preventDefault();
        console.log(store)
    }

    const onLogin = (e) => {
        e.preventDefault();

        requestLogin(userName, password, dispatch);
      
   }

   if(store.isAuth){
       navigate("/");
   }

    return (
        <bases.Base1>

            <div className='login'>
                <h3>Логин</h3>

                <div className='loginForm'>
                    <form >

                        <label>Логин: </label>
                        <input onChange={ (e) => setUserName(e.target.value)}  type='text' value={userName} placeholder='логин' />
                        <label>Пароль: </label>
                        <input onChange={ (e) => setPassword(e.target.value)}  type='password'  value={password} placeholder='пароль' />
                        <button onClick={onLogin}>Войти</button>
                        { store.errorMessage && <p>{store.errorMessage}</p>}
                        <button onClick={showState}>showState</button>
                        

                    </form>
                </div>



            </div>

        </bases.Base1>
    )
}

export default Login