import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "../css/pages_style/ManagerOrderStyle.css";
import { getManagerOrderDetail, updateManagerOrderDetail } from '../redux/manager-reducer';

import { Footer1 } from '../components/footers';
import ManagerHeader from '../components/managerHeader';

function ManagerOrder() {
  const { id } = useParams();
  const { statusId } = useParams();
  const dispatch = useDispatch();
  const managerStore = useSelector(state => state.GetManagerStore);
  const { orderwithproducts, allOrderStatus, orderbyid } = managerStore

  const [selectedOption, setSelectedOption] = useState(statusId); //orderwithproducts[0].order.order_status.id

  const statusOptionChange = (event) => {
    setSelectedOption(event.target.value);

    console.log(event.target.value)

  }

  // const [name, setName] = useState('');
  const [adres, setAdres] = useState('');
  const [message, setMessage] = useState('');

  const updateFormOrder = (e) => {
      e.preventDefault();
      console.log({  adres, message });

      updateManagerOrderDetail(dispatch, id, adres, message, selectedOption)
  };

  

  useEffect(() => {
    getManagerOrderDetail(dispatch, id);
    setAdres(orderbyid.shipping_address)
  }, [])


  useEffect(() => {    
    setAdres(orderbyid.shipping_address)
    setMessage(orderbyid.notes)
    
  }, [orderbyid])

  


  // const testgetManagerOrderDetail = (e) => {
  //   e.preventDefault();
  //   getManagerOrderDetail(dispatch, id)
  // }
  const testorder = () => {
    console.log(allOrderStatus)
    console.log(orderwithproducts) 
    console.log(orderbyid.notes) 

    
    console.log(statusId)   
  }


  return (
    <div className='ManagerOrder'>

      <div className='ManagerOrder-top-block'>
        <h2>заказ № {id}</h2>
        


      </div>
      <ManagerHeader/>

      <div className='ManagerOrder-main-block'>

        
      

        <form className="my-form" onSubmit={updateFormOrder}>

        <div className='ManagerOrder-selected-Status'>
        <label>статус заказа: </label>
          <select value={selectedOption} onChange={statusOptionChange}>
            {allOrderStatus && allOrderStatus.map( item => {
              return <option key={item.id} value={item.id}>{item.title}</option>
            })}
           
          </select>

      
          
        </div>
                {/* <h3>Редактирование заказа:</h3> */}
                {/* <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div> */}
                <div className="form-group">
                    <label htmlFor="adres">Адрес:</label>
                    <input type="text"  value={adres} onChange={(e) => setAdres(e.target.value)}  />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Доп информация:</label>
                    <textarea  value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                </div>
                <button type="submit">Изменить</button>
            </form>
        
        {orderwithproducts && orderwithproducts.map(item => {
          return (
            <div key={item.product.id} className='ManagerOrder-order-block'>
              {/* <Link to={`/managerorder/${item.id}`}><p >№ {item.id}</p> </Link> */}
              <p >Id {item.product.id}</p>

              <img src={item.product.image} />
              <p >{item.product.title}</p>
              <p >{item.product.price}тг/шт. </p>
              <p > {item.count_product} шт.</p>

            </div>

          )

        })}

      </div>


      {/* <button onClick={testgetManagerOrderDetail}>getManagerOrderDetail</button> */}
      <button onClick={testorder}>order</button>
      <Footer1 />
    </div>
  )
}

export default ManagerOrder


