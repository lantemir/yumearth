import axios from 'axios'
import ManagerService from '../services/ManagerService';



export const GET_ALL_ORDERS_MANAGER = "GET_ALL_ORDERS_MANAGER";
export const GET_TOTALCOUNT_MANAGER_ORDER = "GET_TOTALCOUNT_MANAGER_ORDER";
export const GET_PAGESIZE_MANAGER_ORDER = "GET_PAGESIZE_MANAGER_ORDER";
export const GET_CURRENTPAGE_ORDERS = "GET_CURRENTPAGE_ORDERS";
export const GET_ALL_ORDER_STATUS = "GET_ALL_ORDER_STATUS";


//подробная информация по заказу
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";

let initialState = {
  orders: [],
  pageSize: 3,
  totalCount: 0,
  currentPage: 1,

  // with id
  orderwithproducts: [],
  allOrderStatus: [],
  orderbyid: {},
  
};



export function GetManagerReducer(state = initialState, action = null) {
  switch (action.type) {
    case GET_ALL_ORDERS_MANAGER:
      return { ...state, orders: action.payload }
    case GET_TOTALCOUNT_MANAGER_ORDER:
      return { ...state,  totalCount: action.payload}
    case GET_PAGESIZE_MANAGER_ORDER:
      return { ...state,  pageSize: action.payload}
    case GET_ORDER_DETAIL:
      return {...state, orderwithproducts: action.payload}
    case GET_CURRENTPAGE_ORDERS:
       return { ...state,  currentPage: action.payload}
    case GET_ORDER_BY_ID:
        return { ...state,  orderbyid: action.payload}
    
    case GET_ALL_ORDER_STATUS:
        return { ...state, load: false, allOrderStatus: action.payload}
    
    default:
      return state

  }
}


export const getOrdersManager = async(dispatch, currentPage, pageSize) => {

    try{
        const response = await ManagerService.getManagerOrder(currentPage, pageSize);
        
        dispatch({type: GET_PAGESIZE_MANAGER_ORDER, payload: pageSize})
        dispatch({type: GET_TOTALCOUNT_MANAGER_ORDER, payload: response.data.x_total_count})
        dispatch({type: GET_CURRENTPAGE_ORDERS, payload: currentPage})
        dispatch({type: GET_ALL_ORDERS_MANAGER, payload: response.data.managerorders })
        
        console.log(response.data)

    }catch(e){
        console.log(e.response.data.detail)
    }

}


//order with Id
export const getManagerOrderDetail = async(dispatch, orderid) => {
  try{
    const response = await ManagerService.getManagerOrderDetail(orderid);
    const orderStatus = await axios.get('/api/getallstatus/');

    console.log(response.data)
    console.log(orderStatus.data)

    dispatch({type: GET_ALL_ORDER_STATUS, payload: orderStatus.data.orderstatus })
    dispatch({type: GET_ORDER_DETAIL, payload: response.data.managerorder})
    dispatch({type: GET_ORDER_BY_ID, payload: response.data.orderbyid})
    
  }catch(e){
    console.log(e.response.data.detail)
  }
}

export const updateManagerOrderDetail = async(dispatch, orderid, adres, note, statusid) => {
  try{
    const data = {
      orderid: orderid,
      adres: adres,
      note: note,
      statusid: statusid
    }

    const response = await ManagerService.updateManagerOrderDetail(data);

    dispatch({type: GET_ORDER_BY_ID, payload: response.data.managerorderbyid})

    console.log(response.data)
  }catch(e){
    console.log(e.response.data.detail)
  }
}

// export const updateManagerOrderDetailStatus = async(dispatch, statusid) => {
//   try{
//     const data = {
//       statusId: statusId,      
//     }

//     const response = await ManagerService.updateManagerOrderDetail(data);

//     console.log(response.data)
//   }catch(e){
//     console.log(e.response.data.detail)
//   }
// }





  export default GetManagerReducer;