import React, { useState, useEffect } from 'react'
import "../css/pages_style/LoginStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as bases from '../components/bases';
import "../css/pages_style/LoginStyle.css";
// import Slider from './Slider';
import { Link, NavLink } from 'react-router-dom';
import {requestLogin} from '../redux/auth-reducer';
import { Redirect } from 'react-router-dom';



// if (isLoggedIn && isStaff) {
//     return <Redirect to='/admin/' />;
//   } else if (isLoggedIn) {
//     return <Redirect to='/dashboard/' />;
//   }

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const store = useSelector(state => state.GetAuthStore)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    // #пароль менеджера manager Temir777@
    // #пароль пользователя testuser Temir777@
    // temiros@mail.ru


    

    useEffect(() => {
        if (store.isAuth) {   

            console.log(store.isStaff)
            
            // console.log("store.isAuth")
            // console.log(store.isAuth)
            // navigate("/");
            if(store.isStaff){ 
                navigate("/manager");
                console.log("useEffect navigate(/manager);")
            }
            else{
                navigate("/");
                console.log("useEffect navigate(/);")
                console.log(store.isStaff)
            }
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

    console.log(store.isStaff)

        if(store.isStaff){
            navigate("/manager");
            console.log("store.isAuth navigate(/manager);")
        }
        else{
            navigate("/");
            console.log("store.isAuth  navigate(/);")
            console.log(store.isStaff)
        }

       
   }
   

    return (
        <bases.Base1>

            <div className='login'>
              
                
                <div className='loginForm'>
                <h2>Вход в личный кабинет</h2>
                    <form >

                        <label>Логин: </label>
                        <input onChange={ (e) => setUserName(e.target.value)}  type='text' value={userName} placeholder='логин' />
                        <label>Пароль: </label>
                        <input onChange={ (e) => setPassword(e.target.value)}  type='password'  value={password} placeholder='пароль' />
                        <button type="submit" onClick={onLogin}>Войти</button>
                        { store.errorMessage && <p>{store.errorMessage}</p>}
                        {/* <button onClick={showState}>showState</button> */}

                                     
                        

                    </form>


                    <Link to={`/register/`}> Регистрация</Link>
                    <br/> 
                    <Link to={`/forgetpassword/`}> Забыл пароль</Link>  
                    



                </div>



            </div>

        </bases.Base1>
    )
}

export default Login