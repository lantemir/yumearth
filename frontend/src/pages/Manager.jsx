import React from 'react'
import "../css/pages_style/ManagerStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersManager } from '../redux/manager-reducer';
import { Link } from 'react-router-dom';
import Paginator from '../components/Paginator/Paginator';


function Manager() {

  const dispatch = useDispatch()
  const Managerstore = useSelector(state => state.GetManagerStore)

  const { orders, pageSize, totalCount, currentPage, } = Managerstore

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

      <div className='manager-main-block'>
        {orders && orders.map(item => {
          return (
            <div key={item.id} className='manager-order-block'>
              <Link to={`/managerinfo/${item.id}`}><p >№ {item.id}</p> </Link>
              <p >{item.phone_number}</p>

              <p >{item.total_price} тг</p>
              <p >{item.order_status.title} </p>

              <p>{item.created_datetime.slice(0, 19)}</p>




            </div>

          )

        })}

      </div>


      <div className='paginatorProducts'>

        <Paginator currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
      </div>

      <button onClick={testorder} >testorder</button>

      <button onClick={checkState} >checkState</button>

    </div>
  )
}

export default Manager