import React from 'react'
import "./ProductsStyle.css";

function Products() {
    return (
        <div className='productWrapper'>
            <div className='productBox'>
                <img src='https://mmebonbons-blog.com/wp-content/uploads/2021/02/Visuels-Blog-700x485.png'/>
                <h3>Organic assorted flavors vitamin c lollipops</h3>
                <p>10000 тг</p>
            </div>
            <div className='productBox'>
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
            </div>
        </div>
    )
}

export default Products