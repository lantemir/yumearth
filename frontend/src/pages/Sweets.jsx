import React, { useEffect } from 'react'

import * as bases from '../components/bases';
import Products from './Products';
import Slider from './Slider';

import { useDispatch, useSelector } from 'react-redux';

import { requestCurrentCategory, getAllProducts } from '../redux/products-reducer';
import Paginator from '../components/Paginator/Paginator';
import { Link } from 'react-router-dom';
import "./SweetsStyle.css";

function Sweets() {
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

        getAllProducts(dispatch, currentPage, pageSize, categoryid)



    }, [categoryid])






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
            <Slider />
            <div className='sweets'>
                {console.log("render sweets")}

                <h1>cладости</h1>

                <ul>
                    {/* {categories && categories[0].title} */}
                    {categories && categories.map(item => {
                        return (
                            <li onClick={() => requestCurrentCategory(dispatch, item.id)} key={item.id}> <i class="fa-solid fa-arrow-down-wide-short"></i> {item.title}</li>
                        )
                    })}
                </ul>



                <div className='productWrapper'>


                    {console.log("render prod")}

                    {products && products.map(item => {
                        return (
                            <div className='productBox' key={item.id}>
                                <Link to={`/sweet/${item.id}`}>
                                    <img src={item.image} />
                                    <h3>{item.title}</h3>
                                    <p>{item.price}тг</p>
                                </Link>
                                
                            </div>
                        )
                    })}



                    <div className='paginatorProducts'>

                        <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
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