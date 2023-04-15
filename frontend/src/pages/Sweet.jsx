import React, { useEffect, useState } from 'react'
import * as bases from '../components/bases';
import { useParams } from "react-router-dom";
import Slider from './Slider';

import { useDispatch, useSelector } from 'react-redux';
import "./SweetStyle.css";
import { getProduct, AddToBasket, checkCount } from "../redux/product-reducer";
import { getFromLocalStorage} from '../redux/basket-reducer';


function Sweet() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const prodStore = useSelector(state => state.GetProductStore);

  const { product, count, basketProduct} = prodStore;


  const[countProduct, setCountProduct] = useState(1)

  const [showCartPopup, setShowCartPopup] = useState(false); //animation


  useEffect(() => {
    console.log("useEffect setCountProduct")
    setCountProduct(count)
  }, [count])

  useEffect(() => {

    getProduct(dispatch, id);
    checkCount(dispatch,id)
  }, [])

  // const checkStore = () => {
  //   console.log(prodStore)
  // }

  const addBasket = () => {
    AddToBasket(dispatch, countProduct, id )
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 2500);

    getFromLocalStorage(dispatch);
  }

  return (
    <bases.Base1>
      <Slider />
      <div className='sweet'>

        <div className='sweetImg'>
          <img src={product.image} />
        </div>

        <div className='sweetContent'>
          <h1>{product.title}</h1>
          <form >
            <label htmlFor="quantity">колличество: </label>
            <input onChange={(e)=>setCountProduct(e.target.value)} type="number" id="quantity" name="quantity" value={countProduct} min="1" max="100" />
            <label htmlFor="quantity"> штук</label>
            
          </form>
          <p>{product.description}</p>
          <button onClick={addBasket}>добавить в корзину</button>
          {/* <button onClick={checkStore}>checkStore</button> */}
        </div>


        {showCartPopup && (
        <div className="cart-popup">
          <div className="cart-popup-message">Товар добавлен в корзину</div>
        </div>
      )}


      </div>
    </bases.Base1>

  )
}

export default Sweet