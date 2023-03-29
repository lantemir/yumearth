import React from 'react'
import {  useSelector } from 'react-redux';
import * as bases from '../components/bases';
import { useNavigate } from 'react-router-dom';
import "../css/pages_style/OrderResultStyle.css";

function OrderResult() {

    const basketStore = useSelector(state => state.GetBasketStore)    
    const { orderNumber } = basketStore;
    const navigate = useNavigate();


    const sentToMain = (e) => {
        e.preventDefault();      
        navigate("/");
    }


  return (
    <bases.Base1>
    <div className="thank-you-container">
  <h1>Спасибо за заказ <i class="fa-regular fa-face-smile-beam"></i></h1>
  <p>Ваш номер заказа: <span className="order-number">{orderNumber}</span>.</p>
  <p>С Вами свяжется менеджер интернет магазина для уточнения деталей.</p>
  <button onClick={sentToMain} className="continue-shopping-button">OK</button>
  
</div>
</bases.Base1>
  )
}

export default OrderResult