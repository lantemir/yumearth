import axios from 'axios'

export const GET_PRODUCT_DATA = "GET_PRODUCT_DATA";



let initialState = {
    product: {},
    count: 1,
    
  };
  
export function GetProductReducer(state = initialState, action = null) {
    switch(action.type){
        case GET_PRODUCT_DATA:
            return {...state, product: action.payload }
        default:
            return state
    }
}

export const getProduct = async(dispatch, productid) => {
    console.log("qweeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const response = await axios.get('/api/product/', {
        params:{productid: productid}
    })

    dispatch({type: GET_PRODUCT_DATA, payload: response.data.product })


    

    console.log(response.data.product)
}

export default GetProductReducer;