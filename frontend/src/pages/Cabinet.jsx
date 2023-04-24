import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { getUser, sendingEmail, sendingEmailRedis, savingEmailWithConfirmation ,changeAdres, getOrdersByUserId } from '../redux/cabinet-reducer';
import { checkEmails } from '../functions/checkEmail';
import {  useNavigate } from "react-router-dom";
import { logout, checkManagerInCabinet } from '../redux/auth-reducer';
import * as bases from '../components/bases';
import "../css/pages_style/CabinetStyle.css";
import Paginator from '../components/Paginator/Paginator';

// import ReactDomServer from 'react-dom/server'

function Cabinet() {

    const [emailState, setEmailState] = useState('');
    const [adresState, setAdresState] = useState('');
    const [is_confirmed_email_state, set_is_confirmed_email] = useState(false)

    const [showCartPopup, setShowCartPopup] = useState(false); //animation
    const [showMessageForUser, setShowMessageForUser] = useState('');

    const cabinetStore = useSelector(state => state.GetCabinetStore)
    
    const { user , oredersByUser, pageSize, totalCount, currentPage } = cabinetStore
            
    const store = useSelector(state => state.GetAuthStore)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    useEffect(() => {

      
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
        checkManagerInCabinet(dispatch)
        getUser(dispatch);        
        getOrdersByUserId(dispatch, currentPage, pageSize)
     
    }, [])

    if (store.isAuth) {  

      
        if(store.isStaff){ 
            navigate("/manager");          
        }
       
    }
    

    const onPageChanged = (currentPage) => {
        getOrdersByUserId(dispatch, currentPage, pageSize)
    }

    const testRequest = (e) => {
        e.preventDefault();
        getOrdersByUserId()
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
            
            showPopUp("неправильно написали имэйл")            
        }


        

 
    }

    const testState = (e) => {
        e.preventDefault();
        console.log(cabinetStore)
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
                

               
                
                {/* <button onClick={sendingEmail}>sendingEmail</button>
                <button onClick={sendingEmailRedis}>sendingEmailRedis</button>

                <button onClick={testRequest}>testRequest ORDERS</button>
                <button onClick={testState}>testState</button> */}

                
                {oredersByUser.orders && oredersByUser.orders.map(item => {
                    const totalPrice = item.orderproduct_set.reduce((acc, itemProd )=> acc + (itemProd.product.price * itemProd.count_product), 0)
                     return(
                        <div key={item.id} className='profilInfo'>
                        <h3>Заказ №: {item.id} </h3>
                        <h4>Статус: {item.order_status.title}</h4>
                        
                        {item.orderproduct_set.map(itemProd => {
                            return(
                                <div key={itemProd.product.id} className='orderLine'>
        
                                <div className='orderLineimg'>
                                    <img src={itemProd.product.image} />
                                </div>
                                <div className='orderLineDescription'>
                                    <span>{itemProd.product.title} </span>
                                    <span>{itemProd.product.price} тг</span>
                                    <span>{itemProd.count_product} шт</span>
                                </div>
                            </div>
                            )
                            
                        }) }

                            
        
                          
                            <p className='sumOrder'>Итого: {totalPrice} тенге</p>
                        </div>
                     ) 
                })}

                <div className='paginatorProducts'>                    
                  <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
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