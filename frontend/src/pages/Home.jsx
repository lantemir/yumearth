import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as bases from '../components/bases';
import { Helmet } from 'react-helmet';
import "./HomeStyle.css";
import Slider from './Slider';
import Products from './Products';

import { GetAllSms } from '../redux/message-reducer';
import picc from '../static/frontimage/picMain.png';
import { Link, NavLink } from 'react-router-dom';


// export const GET_ALL_MESSAGE_LOAD = "GET_ALL_MESSAGE_LOAD";
// export const GET_ALL_MESSAGE_DATA = "GET_ALL_MESSAGE_DATA ";
// export const GET_ALL_MESSAGE_ERROR = "GET_ALL_MESSAGE_ERROR";
// export const GET_ALL_MESSAGE_FAIL = "GET_ALL_MESSAGE_FAIL";
// export const GET_ALL_MESSAGE_RESET = "GET_ALL_MESSAGE_RESET";

// export function GetAllMessageReducer(state = {}, action = null) {
//   switch (action.type) {
//     case GET_ALL_MESSAGE_LOAD:
//       return { load: true }
//     case GET_ALL_MESSAGE_DATA:
//       return { load: false, data: action.payload }
//     case GET_ALL_MESSAGE_ERROR:
//       return { error: 'Ошибка на сервере' }
//     case GET_ALL_MESSAGE_FAIL:
//       return { error: 'Ошибка на клиенте' }
//     case GET_ALL_MESSAGE_RESET:
//       return { load: true }
//     default:
//       return state

//   }
// }


export function Home() {

  const dispatch = useDispatch();
  const smsStore = useSelector(state => state.GetSmsStore)

  // async function GetAllSms() {
  //   dispatch({type: GET_ALL_MESSAGE_LOAD})

  //   const config = {
  //     method: "GET",
  //     timeout: 5000,
  //     url: `/api/chat/?page=1&limit=3`
  //   }

  //   const response = await axios(config)
  //   console.log(response.data )
  //   dispatch({type: GET_ALL_MESSAGE_DATA, payload: response.data.List})        
  // }

  const checkStore = () => {
    console.log(smsStore)
  }

  const getAllsmsRed = () => {
    GetAllSms(dispatch);
  }



  return (
 
    <bases.Base1>
      <Slider />
      <div className='home'>
      <h1>сладости Алматы YumEarth</h1>
      <div className='homelink'>
        <Link to={`/sweets/`}> все сладости</Link>
      </div>
      
      
      <Products />

      

      <Helmet>
        <title>YumEarth: купить сладости, мармелад, леденцы, конфеты YumEarth доступная цена в Алматы, Казахстане | Интернет-магазин yumearth.kz</title>
        <meta name="description" content="В интернет-магазине yumearth представлен широкий выбор товаров YumEarth! ★ Лучшее качество по самым приятным ценам! Доставка по Алматы. 
        Оформите заказ online прямо на сайте yumearth.kz или по телефону: 87772288880!" />
        <meta name="keywords" content="Органические леденцы YumEarth, YumEarth алматы, yumearth.kz" />
        <link rel="canonical" href="https://yumearth.kz" />
      </Helmet>
        
        
          <img src={picc}/>
          
          <h2>О леденцах YumEarth</h2>
          <p><strong>YumEarth - это натуральные леденцы</strong>, которые позволяют Вам наслаждаться вкусом лета в любое время года. Эти леденцы сделаны из натуральных ингредиентов, таких как фрукты, овощи и другие полезные для здоровья компоненты. Благодаря этому, YumEarth предлагает Вам вкусный и здоровый вариант для удовольствия от леденцев.<br /><br />

            Наши леденцы без ГМО, без искусственных красителей и ароматизаторов, а также без добавления сахара. Мы также используем натуральные вегетарианские ингредиенты и не производим нашу продукцию с использованием животных продуктов. Это делает нашу продукцию подходящей для всех, включая веганские и вегетарианские диеты.

            YumEarth предлагает множество вкусов, включая ягоды, цитрусовые фрукты и другие сладости</p>
        </div>

      
      </bases.Base1> 

  )
}

