import React, { useState, useEffect } from 'react'
import "../css/pages_style/LoginStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as bases from '../components/bases';
import "../css/pages_style/LoginStyle.css";
// import Slider from './Slider';
import { Link, NavLink } from 'react-router-dom';
import {forgetenPassword} from '../redux/auth-reducer';
import { Redirect } from 'react-router-dom';



// if (isLoggedIn && isStaff) {
//     return <Redirect to='/admin/' />;
//   } else if (isLoggedIn) {
//     return <Redirect to='/dashboard/' />;
//   }

function ForgetPassword() {

    const [userName, setUserName] = useState('');
    const [forgetenEmail, setForgetenEmail] = useState('');
    const [valid, setValid] = useState(false);

    const store = useSelector(state => state.GetAuthStore)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    // #пароль менеджера manager Temir777@
    // #пароль пользователя testuser Temir777@



    
    

    const showState = (e) => {
         e.preventDefault();
        console.log(store)
    }

    const onForgetPassword = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(forgetenEmail);

        console.log(isValid)
        

        if(isValid){            
            setValid(false)
            // asd@asd.xc
            forgetenPassword(userName, forgetenEmail, dispatch);
        }
        else{
            setValid(true)
        }


        
      
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
                <h2>Забыл пароль</h2>
                    <form >

                        <label>Логин: </label>
                        <input onChange={ (e) => setUserName(e.target.value)}  type='text' value={userName} placeholder='логин' />
                        <label>Email: </label>
                        <input onChange={ (e) => setForgetenEmail(e.target.value)}  type='email'  value={forgetenEmail} placeholder='email' />
                        {valid ? <p>неверная почта</p> : <p></p>}
                        <button type="submit" onClick={onForgetPassword}>Отправить</button>
                        { store.errorMessage && <p>{store.errorMessage}</p>}
                        {/* <button onClick={showState}>showState</button> */}

                                     
                        

                    </form>


                    <Link to={`/register/`}> Регистрация</Link>
                    <br/> 
                    <Link to={`/login/`}> Вспомнил пароль</Link>  
                    



                </div>



            </div>

        </bases.Base1>
    )
}

export default ForgetPassword