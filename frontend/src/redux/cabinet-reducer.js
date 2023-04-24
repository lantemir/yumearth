import axios from "axios";

import CabinetService from "../services/CabinetService" 

const CABINET_SET_USER = "CABINET_SET_USER";
const CABINET_ORDERS_BY_USER = "CABINET_ORDERS_BY_USER";
const GET_PAGESIZE_CABINET_ORDERS = "GET_PAGESIZE_CABINET_ORDERS";
const GET_TOTAL_COUNT_CABINET_ORDERS = "GET_TOTAL_COUNT_CABINET_ORDERS";
const GET_GET_CURRENTPAGE_CABINET_ORDERS = "GET_GET_CURRENTPAGE_CABINET_ORDERS";

let initialState = {
      user: {},
      oredersByUser: [],
      pageSize: 1,
      totalCount: 0,
      currentPage: 1

      
};


const GetCabinetReducer = (state = initialState, action ) => {

    switch(action.type){
        case CABINET_SET_USER: {
            return{...state, user: action.payload}
        }
        case CABINET_ORDERS_BY_USER: {
            return{...state, oredersByUser: action.payload}
        }
        case GET_PAGESIZE_CABINET_ORDERS:
            return{...state, pageSize: action.payload}
        case GET_TOTAL_COUNT_CABINET_ORDERS:
            return{...state, totalCount: action.payload}
        case GET_GET_CURRENTPAGE_CABINET_ORDERS:
            return{...state, currentPage: action.payload}
        default: return state;
    }
}

export const getUser = async (dispatch) => {
    try{
        const response = await CabinetService.getUserProfile();

  
        dispatch({type: CABINET_SET_USER, payload: response.data.user})

       

    }
    catch (e) {
        console.log(e.response)
    }
}


export const savingEmailWithConfirmation = async (userEmail ) => {
    try{
        const data = {
            userEmail: userEmail            
        }
        const response = await CabinetService.confirmEmail(data)

    }
    catch (e) {
        console.log(e)
    }
}




export const sendingEmail = async () => {
    try{

        const data = {
            forgetenEmail:'temiros@mail.ru',
            userName:"testuser"
        }

        const response = await axios.post('/api/mysendmail/', data);
  
    }
    catch (e) {
        console.log(e)
    }
}

export const sendingEmailRedis = async () => {
    try{
        const response = await axios.post('/api/celerytasks/');
     
    }
    catch (e) {
        console.log(e)
    }
}

export const changeAdres = async (adres) => {
    const data = {
        adres: adres,       
    }


    try{
        const response = await CabinetService.changeAdres(data) ;
   
    }
    catch (e) {
        console.log(e)
    }
}

export const getOrdersByUserId = async(dispatch, currentPage, pageSize)=>{

    try{
        const response = await CabinetService.getOrderbyUserId(currentPage, pageSize) ;
    
        
        dispatch({type: CABINET_ORDERS_BY_USER, payload: response.data})

        dispatch({type: GET_PAGESIZE_CABINET_ORDERS, payload: pageSize})
        dispatch({type: GET_TOTAL_COUNT_CABINET_ORDERS, payload: response.data.x_total_count})
        dispatch({type: GET_GET_CURRENTPAGE_CABINET_ORDERS, payload: currentPage})
    }
    catch (e) {
        console.log(e)
    }
    
}







export default GetCabinetReducer