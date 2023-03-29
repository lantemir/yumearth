import React, { useEffect, useState } from 'react'
import "../css/pages_style/ManagerStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersManager } from '../redux/manager-reducer';
import { Link } from 'react-router-dom';
import Paginator from '../components/Paginator/Paginator';

import { Footer1 } from '../components/footers';
import ManagerHeader from '../components/managerHeader';


function Manager() {

  const dispatch = useDispatch()
  const Managerstore = useSelector(state => state.GetManagerStore)

  const { orders, pageSize, totalCount, currentPage, } = Managerstore


  useEffect ( () => {
        
    getOrdersManager(dispatch, currentPage, pageSize);
},[])

  const onPageChanged = (currentPage) => {
    getOrdersManager(dispatch, currentPage, pageSize)
  }


  const testorder = (e) => {
    e.preventDefault();

    getOrdersManager(dispatch, currentPage, pageSize);
  }

  const checkState = (e) => {
    e.preventDefault();

    console.log(orders)
  }

  return (
    <div className='Manager'>
      <div className='manager-top-block'>
        <h1>Manager</h1>
      </div>
      <ManagerHeader/>
 
      <div className='manager-main-block'>
        {orders && orders.map(item => {
          return (
            <div key={item.id} className='manager-order-block'>
              <Link to={`/managerorder/${item.id}/${item.order_status.id}`}><p >№ {item.id}</p> </Link>
              <p >{item.phone_number}</p>

              <p >{item.total_price} тг</p>
              <p >{item.order_status.title} </p>

              <p >{item.delivery_method.title} </p>
              <p >{item.payment_method.title} </p>

              

              <p>{item.created_datetime.slice(0, 19)}</p>

              <Link to={`/manageredit/${item.id}`}> <i class="fa-solid fa-pen-to-square"></i></Link>

              
              

            </div>

          )

        })}

      </div>


      <div className='paginatorProducts'>

        <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
      </div>

      <button onClick={testorder} >testorder</button>

      <button onClick={checkState} >checkState</button>

      <Footer1/>

    </div>
  )
}

export default Manager