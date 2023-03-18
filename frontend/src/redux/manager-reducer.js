import axios from 'axios'
import ManagerService from '../services/ManagerService';



export const GET_ALL_ORDERS_MANAGER = "GET_ALL_ORDERS_MANAGER";
export const GET_TOTALCOUNT_MANAGER_ORDER = "GET_TOTALCOUNT_MANAGER_ORDER";
export const GET_PAGESIZE_MANAGER_ORDER = "GET_PAGESIZE_MANAGER_ORDER";
export const GET_CURRENTPAGE_ORDERS = "GET_CURRENTPAGE_ORDERS";

let initialState = {
  orders: [],
  pageSize: 3,
  totalCount: 0,
  currentPage: 1,
  
};



export function GetManagerReducer(state = initialState, action = null) {
  switch (action.type) {
    case GET_ALL_ORDERS_MANAGER:
      return { ...state, orders: action.payload }
    case GET_TOTALCOUNT_MANAGER_ORDER:
      return { ...state,  totalCount: action.payload}
    case GET_PAGESIZE_MANAGER_ORDER:
      return { ...state,  pageSize: action.payload}
    case GET_CURRENTPAGE_ORDERS:
       return { ...state, load: false, currentPage: action.payload}
    
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





  export default GetManagerReducer;