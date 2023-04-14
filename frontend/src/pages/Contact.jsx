import React from 'react'

import * as bases from '../components/bases';

import "../css/pages_style/ContactStyle.css";

function Contact() {
  return (
    <bases.Base1>
        <div className="contact-container">
  <h1>Контакты</h1>
  <p>Свяжитесь с нами.</p>
  <ul>
    <li>БЦ Q: Желтоксан 191</li>
    <li><a href="tel:+77772288880" ></a>Тел: +7 777 22 88880 </li>
  </ul>

  <div className="map-container">    
  <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A7f0f535303d1625b1c5365fb3c2e562a21dac8f15dab060dfaacf8118ca1c9cf&amp;source=constructor" width="1023" height="408" frameBorder="0"></iframe>
  </div>

  
  {/* <form>
    <label htmlFor="name">Имя:</label>
    <input type="text" id="name" name="name" placeholder="Enter your name" required />

    <label htmlFor="email">Имэйл:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" required />

    <label htmlFor="message">Сообщение:</label>
    <textarea id="message" name="message" placeholder="Enter your message" required></textarea>

    <button type="submit">Send</button>
  </form> */}
</div>
    </bases.Base1>
   
  )
}

export default Contact