import React, { useEffect } from 'react'
import * as bases from '../components/bases';
import { useParams } from "react-router-dom";
import Slider from './Slider';

import { useDispatch, useSelector } from 'react-redux';
import "./SweetStyle.css";
import { getProduct } from "../redux/product-reducer";



function Sweet() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const prodStore = useSelector(state => state.GetProductStore);

  const { product, count } = prodStore;




  useEffect(() => {

    getProduct(dispatch, id);
  }, [])

  const checkStore = () => {
    console.log(product)
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
            <label htmlFor="quantity">колличество:</label>
            <input type="number" id="quantity" name="quantity" min="1" max="100" />
            <input type="submit" />
          </form>
          <p>{product.description}</p>
          <button onClick={checkStore}>В корзину</button>
        </div>



      </div>
    </bases.Base1>

  )
}

export default Sweet