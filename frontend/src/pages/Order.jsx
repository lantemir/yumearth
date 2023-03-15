import React, { useState, useEffect } from 'react'
import "../css/pages_style/LoginStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as bases from '../components/bases';
import "../css/pages_style/OrderStyle.css";
import {newOrder, getDeliveryAndPaymentType } from '../redux/basket-reducer';
// import Slider from './Slider';
import { Link, NavLink } from 'react-router-dom';


function Order() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [adres, setAdres] = useState('');

    const [payOption, setpayOption] = useState(0);
    const [deliveryOption, setDeliveryOption] = useState(0);

    // const payoptions = ['Наличными', 'Кредитная карта'];

    // const deliveroptions = ['Самовывоз', 'Доставка'];

    const basketStore = useSelector(state => state.GetBasketStore)
    const store = useSelector(state => state.GetAuthStore)
    const { totalcount, basketProduct, deliveryType, paymentType } = basketStore;


    const dispatch = useDispatch()
    const navigate = useNavigate();


    const payHandleChange = (event) => {
        setpayOption(event.target.value);
      };

      const handleDelivery = (event) => {
        setDeliveryOption(event.target.value);
      };

    const makeOrder =(e) => {

        e.preventDefault();
         newOrder(dispatch, basketProduct , phoneNumber , adres, payOption, deliveryOption, store.isAuth , totalcount)
    }


    

    useEffect(() => {
        getDeliveryAndPaymentType(dispatch)
      }, []);



    const showState = (e) => {
        e.preventDefault();

        
        console.log(basketStore)
    }

    //     const onLogin = (e) => {
    //         e.preventDefault();

    //         requestLogin(userName, password, dispatch);

    //    }

    //    if(store.isAuth){
    //        navigate("/");
    //    }

    return (
        <bases.Base1>

            <div className='order'>
                <h3>Заказ: {totalcount} тенге </h3>

                <div className='orderForm'>
                    
                    <form >

                        <label>Телефон: </label>
                        <input onChange={(e) => setPhoneNumber(e.target.value)} type='text' value={phoneNumber} placeholder='телефон...' required/>

                        <label>Способо забрать товар:</label>
                        <select value={deliveryOption} onChange={handleDelivery} required>
                            <option value="">--Способ забрать товар--</option>
                            {deliveryType && deliveryType.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.title}
                                </option>
                            ))}
                        </select>


                        <label>Адрес доставки: </label>
                        <input onChange={(e) => setAdres(e.target.value)} type='text' value={adres} placeholder='адрес доставки...' />
                        <label>Способ оплаты:</label>
                        
                        <select value={payOption} onChange={payHandleChange} required>
                            <option value="">--Способ оплаты--</option>
                            { paymentType && paymentType.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.title}
                                </option>
                            ))}
                        </select>

                        
                        <button onClick={makeOrder} >Заказать</button>
                        
                        <button onClick={showState}>showState</button>


                    </form>
                </div>



            </div>

        </bases.Base1>
    )
}

export default Order