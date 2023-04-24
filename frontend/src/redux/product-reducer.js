import axios from 'axios'

export const GET_PRODUCT_DATA = "GET_PRODUCT_DATA";
// export const GET_PRODUCT_BASCET = "GET_PRODUCT_BASCET";
export const GET_PRODUCT_COUNT = "GET_PRODUCT_COUNT";



let initialState = {
    product: {},
    count: 1,

    // basketProduct:[]
    
  };
  
export function GetProductReducer(state = initialState, action = null) {
    switch(action.type){
        case GET_PRODUCT_DATA:
            return {...state, product: action.payload }
        // case GET_PRODUCT_BASCET:
        //     return {...state, basketProduct: action.payload }
        case GET_PRODUCT_COUNT:
            return {...state, count: action.payload}
        default:
            return state
    }
}

export const checkCount = (dispatch, product_id) => {
    const basketFromLocalStorage = JSON.parse(localStorage.getItem('product'))
    if(basketFromLocalStorage){
        let index = basketFromLocalStorage.findIndex(item => item.product_id ===product_id)
         if(index != -1){
            let countFromLocalStorage = basketFromLocalStorage[index].count;

            dispatch({type: GET_PRODUCT_COUNT, payload: countFromLocalStorage})
         }
         else{
          
            dispatch({type: GET_PRODUCT_COUNT, payload: 1})
         }
    }
    else{
  
        dispatch({type: GET_PRODUCT_COUNT, payload: 1})
    }

}

export const AddToBasket = (dispatch, count, product_id) => {
  

    let basketProd = {};

    let basketProductArr = [];

    basketProd.count = count
    basketProd.product_id = product_id



    // localStorage.setItem('product', JSON.stringify(basketProd));     
    
    const basketFromLocalStorage = JSON.parse(localStorage.getItem('product'))

    if(basketFromLocalStorage){
        

        let index = basketFromLocalStorage.findIndex(item => item.product_id ===product_id)

        
        
        const old = basketFromLocalStorage[index]
        if(index === -1){

            console.log("index === -1")
            let obj = {
                count: count,
                product_id: product_id
            }
            let mass = [...basketFromLocalStorage, obj]
            localStorage.setItem('product', JSON.stringify(mass))

            dispatch({type: GET_PRODUCT_COUNT, payload: count})


        } else{

            console.log("index есть")
            // let newObj = {...old, count: count}

            basketFromLocalStorage[index].count = count
            
            // let newMass = [...basketFromLocalStorage.slice(0, index),newObj, ...basketFromLocalStorage.slice(index+1)]
            localStorage.setItem('product', JSON.stringify(basketFromLocalStorage))
        }

        // const rezultItem =  basketFromLocalStorage.map( item => {
        //     console.log(item.id)
        //     if(item.id == product_id){
        //         item.count += count
        //         return item
        //     }
        // })

          
        

        
    }
    else{
       

        basketProductArr= [basketProd]
        dispatch({type: GET_PRODUCT_COUNT, payload: 1})
        localStorage.setItem('product', JSON.stringify( basketProductArr));     
    }

    

    


    

}


export const getProduct = async(dispatch, productid) => {
   
    const response = await axios.get('/api/product/', {
        params:{productid: productid}
    })

    dispatch({type: GET_PRODUCT_DATA, payload: response.data.product })


    


}

export default GetProductReducer;