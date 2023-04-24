import React, { useEffect } from 'react'
import "./ProductsStyle.css";
import { getAllProducts } from '../redux/products-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../components/Paginator/Paginator';
import { Link } from 'react-router-dom';

function Products(props) {
    const dispatch = useDispatch();

    const productStore = useSelector(state => state.GetProductsStore)

    const { products, pageSize, totalCount, currentPage, categoryid } = productStore

    useEffect ( () => {
        
             getAllProducts(dispatch, 1, pageSize, categoryid)
    },[])

    // useEffect ( () => {
        
    //     getAllProducts(dispatch,currentPage, pageSize, categoryid)

    //     console.log("qwe")
             
    // },[categoryid])


   

    const onPageChanged = (currentPage) => {
        getAllProducts(dispatch, currentPage, pageSize, categoryid)    
      }

    

    return (
        <div className='productWrapper'>

        {/* {console.log("render prod")} */}

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




            {/* <div className='productBox'>
                <img src='https://mmebonbons-blog.com/wp-content/uploads/2021/02/Visuels-Blog-700x485.png'/>
                <h3> vitamin c lollipops</h3>
                <p>11000 тг</p>
            </div>
            <div className='productBox'>
                <img src='https://ankorstore.imgix.net/products/images/132638-47cd44ae34b501.jpg?auto=compress&fm=pjpg&w=1600&dpr=2&fit=min'/>
                <h3>Organic assorted flavors vitamin c lollipops</h3>
                <p>5000 тг</p>
            </div>
            <div className='productBox'>
                <img src='https://mmebonbons-blog.com/wp-content/uploads/2021/02/Visuels-Blog-700x485.png'/>
                <h3>Organic assorted flavors </h3>
                <p>8000 тг</p>
            </div> */}

            

            <div className='paginatorProducts'>

                <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
            </div>
           
        </div>
    )
}

export default Products