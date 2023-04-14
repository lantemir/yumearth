import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { getUser, sendingEmail, sendingEmailRedis, savingEmailWithConfirmation ,changeAdres, getOrderById } from '../redux/cabinet-reducer';
import { checkEmails } from '../functions/checkEmail';
import {  useNavigate } from "react-router-dom";
import { logout } from '../redux/auth-reducer';
import * as bases from '../components/bases';
import "../css/pages_style/CabinetStyle.css";

// import ReactDomServer from 'react-dom/server'

function Cabinet() {

    const [emailState, setEmailState] = useState('');
    const [adresState, setAdresState] = useState('');
    const [is_confirmed_email_state, set_is_confirmed_email] = useState(false)

    const [showCartPopup, setShowCartPopup] = useState(false); //animation
    const [showMessageForUser, setShowMessageForUser] = useState('');

    const cabinetStore = useSelector(state => state.GetCabinetStore)
    const { user } = cabinetStore
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        console.log("useEffectUser")
        if(user && user.user ){
            setEmailState(user.user.email)
            setAdresState(user.delivary_adres)
            set_is_confirmed_email(user.is_confirmed_email)
        }
        
    }, [user])


    useEffect(() => {

        // const callback = () => {
        //     if(user && user.user){
        //         setEmailState(user.user.email)
        //     }
        // };
        getUser(dispatch);        
        
     
    }, [])

    const testRequest = (e) => {
        e.preventDefault();
        getOrderById()
    }

    const changingAdres = (e) => {
        e.preventDefault();
        changeAdres(adresState)
        
       
    }

    const showPopUp = (mes) => {

        
            setShowMessageForUser(mes)
            setShowCartPopup(true);
            setTimeout(() => {
                setShowCartPopup(false);
                setShowMessageForUser("")
            }, 2500);

    }

    const changeEmail = (e) => {
        e.preventDefault();
        const checked = checkEmails(emailState)

        if(checked){     
            savingEmailWithConfirmation(emailState)       
            showPopUp("ссылка подтверждения имэйла отправлена на почту")           
        }
        else{
            console.log(checked)
            showPopUp("неправильно написали имэйл")            
        }


        

        console.log(checked)
    }

    const testState = (e) => {
        e.preventDefault();
        console.log(user.user.email)
    }

    const gologout = (e) => {
        e.preventDefault();
        logout(dispatch);
        navigate("/");
      }



    return (
        <bases.Base1>

            <div className='cabinet'>
                <div className='cabinetExit'>
                     <button onClick={gologout}>Выход</button>
                </div>
                
                <h3>Личный кабинет: {user.user?.username}</h3>
                
                
                <div className='profilInfo'>
                    <h2>Ваш имэйл</h2>
                    <form>

                        
                            {is_confirmed_email_state ? <label>Всё ОК. Имэйл подтверждён</label> : <label>  Имэйл НЕ подтверждён через почту, пройдите по ссылке отправленную Вам на почту </label>}
                            
                        <input type='text' onChange={(e) => { setEmailState(e.target.value) }} value={emailState} placeholder='email' />
                        
                        <button onClick={changeEmail} >сохранить email</button>
                        </form>
                 </div>

                 <div className='profilInfo'>
                    <h2>Доставка</h2>

                 <form>
                    
                        <label>Адрес доставки: </label>
                        <input className='adresInput' type='text' onChange={(e) => { setAdresState(e.target.value) }} value={adresState} placeholder='адрес доставки' />
                        <button onClick={changingAdres} >изменить</button>
                        
                    </form>
                    </div>
                

               
                
                <button onClick={sendingEmail}>sendingEmail</button>
                <button onClick={sendingEmailRedis}>sendingEmailRedis</button>

                <button onClick={testRequest}>testRequest ORDERS</button>
                <button onClick={testState}>testState</button>

                <h3>Заказ №: 1</h3>

                <div className='profilInfo'>
                    <div className='orderLine'>

                        <div className='orderLineimg'>
                            <img src='https://images.satu.kz/188470933_w640_h640_organicheskie-ledentsy-yumearth.jpg' />
                        </div>
                        <div className='orderLineDescription'>
                            <span>title1 </span>
                            <span>5000 тг</span>
                            <span>3 шт</span>
                        </div>
                    </div>

                    <div className='orderLine'>

                        <div className='orderLineimg'>
                            <img src='https://images.satu.kz/188470933_w640_h640_organicheskie-ledentsy-yumearth.jpg' />
                        </div>
                        <div className='orderLineDescription'>
                            <span>title1 </span>
                            <span>5000 тг</span>
                            <span>3 шт</span>
                        </div>

                    </div>
                    <p className='sumOrder'>Итого: 25000 тенге</p>
                </div>

                <h3>Заказ №: 2</h3>

                <div className='profilInfo'>
                    <div className='orderLine'>

                        <div className='orderLineimg'>
                            <img src='https://images.satu.kz/188470933_w640_h640_organicheskie-ledentsy-yumearth.jpg' />
                        </div>
                        <div className='orderLineDescription'>
                            <span>title1 </span>
                            <span>5000 тг</span>
                            <span>3 шт</span>

                        </div>
                    </div>

                    <div className='orderLine'>

                        <div className='orderLineimg'>
                            <img src='https://images.satu.kz/188470933_w640_h640_organicheskie-ledentsy-yumearth.jpg' />
                        </div>
                        <div className='orderLineDescription'>
                            <span>title1 </span>
                            <span>5000 тг</span>
                            <span>3 шт</span>
                        </div>
                    </div>
                </div>


                {showCartPopup && (
        <div className="cart-popup">
          <div className="cart-popup-message">{showMessageForUser}</div>
        </div>
      )}


            </div>

        </bases.Base1>
    )
}

export default Cabinet