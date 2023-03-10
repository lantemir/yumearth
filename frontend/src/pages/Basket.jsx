import React, { useState, useEffect } from 'react'
import "../css/pages_style/BasketStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import * as bases from '../components/bases';

import { getFromLocalStorage, clearBasket, newOrder } from '../redux/basket-reducer';
import { Link } from 'react-router-dom';



function Basket() {
    const dispatch = useDispatch();

    const basketStore = useSelector(state => state.GetBasketStore)

    const { totalcount, basketProduct } = basketStore;

    useEffect ( () => {
        
        getFromLocalStorage(dispatch);
},[])

    const clearingBasket = () => {
        clearBasket(dispatch)
        
    }

    const makeOrder =() => {
        newOrder(dispatch, basketProduct)
    }

    const testgetFromLocalStorage = () => {
        getFromLocalStorage(dispatch);
    }

    const teststate = (e) => {
        e.preventDefault();

        console.log(basketStore);
    };

    // const [emailState, setEmailState] = useState('');

    return (
        <bases.Base1>

            <div className='basket'>


                <h3>Корзина</h3>

                <div className='profilInfoBasket'>


                    {
                        basketProduct &&  basketProduct.map(item => {
                            return (
                                <div key={item.id} className='orderLine'>

                                    <div className='orderLineimg'>
                                    <img src={item.image} />
                                    </div>
                                    <div className='orderLineDescription'>
                                        <Link to = {`/sweet/${item.id}`}><span>{item.title} </span></Link>
                                        <span>{item.price} тг</span>
                                        <span>{item.count} шт</span>
                                    </div>
                                </div>
                            )

                        })
                    }                  

                    <div className='buttonLine'>
                       <button onClick={clearingBasket}>Очистить корзину</button>
                       <Link to = {`/order/`}> <button  className='bgGreen'>Продолжить</button></Link>
                        
                        <p className='sumOrder'>Итого: {totalcount} тенге</p>
                    </div>
                </div>

                {/* <button onClick={testgetFromLocalStorage}>testgetFromLocalStorage</button> */}

                {/* <button onClick={teststate}>state</button> */}


            </div>

        </bases.Base1>
    )
}

export default Basket