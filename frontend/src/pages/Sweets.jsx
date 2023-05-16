import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import * as bases from '../components/bases';
import Products from './Products';
import Slider from './Slider';

import { useDispatch, useSelector } from 'react-redux';

import { requestCurrentCategory, getAllProducts } from '../redux/products-reducer';
import Paginator from '../components/Paginator/Paginator';
import { Link } from 'react-router-dom';
import "./SweetsStyle.css";


function Sweets() {
   let rerenderTest = false

    const dispatch = useDispatch();
    const productStore = useSelector(state => state.GetProductsStore);


    const { products, pageSize, totalCount, currentPage, categoryid, categories } = productStore


    // useEffect(() => {
    //     getProductCategory(dispatch)
    // }, [currentPage])

    useEffect(() => {

        getAllProducts(dispatch, 1, pageSize, 0)
    }, [])



    useEffect(() => {

        getAllProducts(dispatch, 1, pageSize, categoryid)
        
        

    }, [categoryid])

    // useEffect(() => {
    //     console.log("useEffectcurrentPage")
    // }, [currentPage])






    const onPageChanged = (currentPage) => {
        getAllProducts(dispatch, currentPage, pageSize, categoryid)
    }

    const getProductCategorytest = () => {
        console.log(categories);

    }


    const checkStore = () => {
        console.log(productStore)
    }


    return (

        <bases.Base1>
            {console.log("render Sweets")}
            {/* <Slider /> */}
            <Helmet>
                <title>Сладости Алматы конфеты от YumEarth доступная цена | Интернет-магазин yumearth.kz</title>
                <meta name="description" content="В интернет-магазине yumearth представлен широкий выбор сладостей YumEarth! ★ Лучшее качество по самым приятным ценам! Доставка по Алматы. 
                Оформите заказ online прямо на сайте yumearth.kz или по телефону: 87772288880!" />
                <meta name="keywords" content="Органические леденцы YumEarth, YumEarth алматы, yumearth.kz" />
                <link rel="canonical" href="https://yumearth.kz" />
            </Helmet>
            <div className='sweets'>
                

                <h1>cладости Алматы</h1>

                <ul>
                    
                    {categories && categories.map(item => {
                        return (
                            <li onClick={() => requestCurrentCategory(dispatch, item.id)} key={item.id}> <i className="fa-solid fa-arrow-down-wide-short"></i> {item.title}</li>
                        )
                    })}
                </ul>



                <div className='productWrapper'>


                    

                    {products && products.map(item => {
                        return (
                            <div className='productBox' key={item.id}>
                                <Link to={`/sweet/${item.id}`}>
                                    <img src={item.image} />
                                    <h3>{item.title}</h3>
                                    <p>{item.price} &#8376;</p>
                                </Link>
                                
                            </div>
                        )
                    })}



                    <div className='paginatorProducts'>

                        <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged}  />
                    </div>
                    <div>
                        {/* <button onClick={testGetProd}>testGetProd</button> */}
                        {/* <button onClick={checkStore}>checkStore</button>
                        <button onClick={testprops}>testprops</button> */}
                        {/* <button onClick={checkStore}>checkStore</button> */}
                    </div>
                </div>


                {/* <button onClick={getProductCategorytest}>getProductCategory</button> */}
            </div>
        </bases.Base1>
    )
}

export default Sweets