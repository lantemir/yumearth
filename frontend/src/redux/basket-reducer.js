import axios from 'axios'


export const GET_PRODUCT_BASCET = "GET_PRODUCT_BASCET";
export const GET_PRODUCT_TOTALCOUNT = "GET_PRODUCT_TOTALCOUNT";
export const CLEAR_BASKET = "CLEAR_BASKET"



let initialState = {
    
    totalcount: 0,

    basketProduct:[]
    
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
        console.log(response.data.product)
        const productDb = response.data.product

        console.log("basketFromLocalStorage")
        console.log(basketFromLocalStorage)

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

}

export const newOrder = (dispatch) => {
    
}