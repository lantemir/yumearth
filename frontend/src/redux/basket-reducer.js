import axios from 'axios'
import OrderService from '../services/OrderService';

export const GET_PRODUCT_BASCET = "GET_PRODUCT_BASCET";
export const GET_PRODUCT_TOTALCOUNT = "GET_PRODUCT_TOTALCOUNT";
export const CLEAR_BASKET = "CLEAR_BASKET";
export const GET_DELIVARY_TYPE = "GET_DELIVARY_TYPE";
export const GET_PAYMENT_TYPE = "GET_PAYMENT_TYPE";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";



let initialState = {
    
    totalcount: 0,
    basketProduct:[],
    deliveryType:[],
    paymentType: [], 
    orderNumber: '',    // продолжить
  };


export function GetBasketReducer(state = initialState, action = null) {
    switch(action.type){
        // case GET_PRODUCT_DATA:
        //     return {...state, product: action.payload }
        case GET_PRODUCT_BASCET:
            return {...state, basketProduct: action.payload }
        case GET_PRODUCT_TOTALCOUNT:
            return {...state, totalcount: action.payload}
        case CLEAR_BASKET:
            return {...state, basketProduct: action.payload}
        case GET_DELIVARY_TYPE:
                return {...state, deliveryType: action.payload}
        case GET_PAYMENT_TYPE:
                return {...state, paymentType: action.payload}
        case GET_ORDER_NUMBER:
            return {...state, orderNumber: action.payload}
        default:
            return state
    }
}






export const getFromLocalStorage = async(dispatch) => {
    const basketFromLocalStorage = JSON.parse(localStorage.getItem('product'))
    if(basketFromLocalStorage){

       

        const data = {
            basketlocalstorage: basketFromLocalStorage
        }       

        const response = await axios.post('/api/basketproducts/', data)        
        const productDb = response.data.product       

        const updateObjects = productDb.map(obj1 =>{
            const obj2 = basketFromLocalStorage.find(obj2 => obj1.id ===  parseInt(obj2.product_id));

            console.log(obj2)
            return obj2 ? {...obj1, count: parseInt(obj2.count)} : obj1;
        })

        let totalcountSum = 0;

        updateObjects.map(item => {
            totalcountSum +=  item.price * item.count
        })      
        dispatch({type: GET_PRODUCT_BASCET, payload: updateObjects})
        dispatch({type: GET_PRODUCT_TOTALCOUNT, payload: totalcountSum})
    }
}

export const clearBasket = (dispatch) => {
    localStorage.removeItem("product");
    dispatch({type: CLEAR_BASKET, payload: []})
    dispatch({type: GET_PRODUCT_TOTALCOUNT, payload: 0})

    
}



export const getDeliveryAndPaymentType = async(dispatch) => {

    const deliveryAndPaymentType = await axios.get('/api/deliveryandpaymenttype/');


    
    dispatch({type: GET_DELIVARY_TYPE, payload: deliveryAndPaymentType.data.delivery})
    dispatch({type: GET_PAYMENT_TYPE, payload: deliveryAndPaymentType.data.payment})

    
}

export const newOrder = async(dispatch,  basketProduct , phoneNumber , adres, payOption, deliveryOption, isAuth ,totalcount) => {
    if (basketProduct){

        let orders = null

        const data = {
            basketProducts: basketProduct,
            phoneNumber: phoneNumber,
            adres: adres,
            payOption: payOption,
            deliveryOption: deliveryOption,
            totalcount: totalcount
        }   

        console.log(isAuth)

        if (isAuth){
            console.log("bascetReducer isAuth: true")
            orders = await OrderService.setOrder(data);
        }
        else{
            console.log("Order with out user")
            orders = await axios.post('/api/orders/', data)
        }
        
        

        // const orders = await axios.post('/api/orders/', data)
        dispatch({type: GET_ORDER_NUMBER, payload: orders.data.orderid})

        console.log("orders")
        console.log(orders.data)
        dispatch({type: GET_PRODUCT_TOTALCOUNT, payload: 0})

    }
    
}

export const getOrderNumber = () => {

}