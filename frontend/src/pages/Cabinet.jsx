import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import * as bases from '../components/bases';
import "../css/pages_style/CabinetStyle.css";
import Slider from './Slider';

function Cabinet() {

    const [emailState, setEmailState] = useState('');

    return (
        <bases.Base1>

            <div className='cabinet'>
                <h3>Личный кабинет: Темир</h3>
                <div className='profilInfo'>
                    <h3>профиль:</h3>
                    <form>

                        <label>Email: </label>
                        <input type='text' onChange={(e) => { setEmailState(e.target.value) }} value={emailState} placeholder='email' />
                        <label>Адрес доставки: </label>
                        <input className='adresInput' type='text' onChange={(e) => { setEmailState(e.target.value) }} value={emailState} placeholder='адрес доставки' />

                    </form>

                </div>

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


            </div>

        </bases.Base1>
    )
}

export default Cabinet