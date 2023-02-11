import React from 'react'
import * as bases from '../components/bases';
import Slider from './Slider';
import "./AboutStyle.css";

function About() {
  return (
    <bases.Base1>
        <Slider/>
       <div className='about'>
        <h1>О леденцах YumEarth</h1>
 <p><strong>YumEarth это бренд натуральных леденцов</strong>, основанный в 2008 году в Нью-Йорке. Основатели бренда, Ричард и Эрик Штейнберг, хотели создать здоровый альтернативный вариант леденцов, которые можно наслаждаться без сомнений о их происхождении и составе.

YumEarth использует натуральные ингредиенты, такие как фруктовые соки, вегетарианские сиропы и натуральные красители, и отказывается от использования искусственных красителей, ароматизаторов и консервантов. Бренд заявляет, что его продукты являются вегетарианскими, без глютена, без ГМО и без пшеницы, что делает их подходящими для широкого круга потребителей.

С тех пор YumEarth стал популярным брендом натуральных леденцов, продающим свои продукты в магазинах по всей стране</p>
    </div>
    </bases.Base1>
  )
}

export default About