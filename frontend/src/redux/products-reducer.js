import axios from 'axios'

export const GET_ALL_PRODUCTS_LOAD = "GET_ALL_PRODUCTS_LOAD";
export const GET_ALL_PRODUCTS_DATA = "GET_ALL_PRODUCTS_DATA ";
export const GET_ALL_PRODUCTS_ERROR = "GET_ALL_PRODUCTS_ERROR";
export const GET_ALL_PRODUCTS_FAIL = "GET_ALL_PRODUCTS_FAIL";
export const GET_ALL_PRODUCTS_RESET = "GET_ALL_PRODUCTS_RESET";
export const GET_PAGESIZE_PRODUCTS = "GET_PAGESIZE_PRODUCTS";
export const GET_TOTALCOUNT_PRODUCTS = "GET_TOTALCOUNT_PRODUCTS";
export const GET_CURRENTPAGE_PRODUCTS = "GET_CURRENTPAGE_PRODUCTS";
export const GET_CATEGORY_PRODUCTS = "GET_CATEGORY_PRODUCTS";

export const GET_CATEGORYES_PRODUCTS = "GET_CATEGORYES_PRODUCTS";

let initialState = {
  products: [],
  pageSize: 6,
  totalCount: 0,
  currentPage: 1,
  categoryid: 0,
  load: false,
  categories: [],
};



export function GetProductsReducer(state = initialState, action = null) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_LOAD:
      return { load: true }
    case GET_ALL_PRODUCTS_DATA:
      return { ...state, load: false,  products: action.payload }
    case GET_PAGESIZE_PRODUCTS:
      return { ...state, load: false, pageSize: action.payload}
    case GET_TOTALCOUNT_PRODUCTS:
      return { ...state, load: false, totalCount: action.payload}
    case GET_CURRENTPAGE_PRODUCTS:
        return { ...state, load: false, currentPage: action.payload}

    case GET_CATEGORY_PRODUCTS:
        return { ...state, load: false, categoryid: action.payload}

    case GET_CATEGORYES_PRODUCTS:
        return {...state, load: false, categories: action.payload}
    case GET_ALL_PRODUCTS_ERROR:
      return { error: 'Ошибка на сервере' }
    case GET_ALL_PRODUCTS_FAIL:
      return { error: 'Ошибка на клиенте' }
    case GET_ALL_PRODUCTS_RESET:
      return { load: true }
    default:
      return state

  }
}

export const getProductCategory = async(dispatch) => {

  const response = await axios.get('/api/productcategory');

  

  dispatch({type:GET_CATEGORYES_PRODUCTS, payload: response.data.category })

}

export const requestCurrentCategory = (dispatch, categoryid) => {

  dispatch({type: GET_CATEGORY_PRODUCTS, payload: categoryid})
  
}



export const   getAllProducts = async(dispatch, currentPage, pageSize, categoryid) => {

  
    //  dispatch({type: GET_ALL_PRODUCTS_LOAD})

    // const config = {
    //   method: "GET",
    //   timeout: 5000,
    //   url: ('/api/products',{currentPage: 1, pageSize: 3, categoryid: 1})
    // }

    const response = await axios.get('/api/product/', {
        params:{currentPage: currentPage, pageSize: pageSize, categoryid: categoryid}
    })

    const responsecat = await axios.get('/api/productcategory');
    dispatch({type:GET_CATEGORYES_PRODUCTS, payload: responsecat.data.category })

    dispatch({type: GET_PAGESIZE_PRODUCTS, payload: pageSize})
    dispatch({type: GET_TOTALCOUNT_PRODUCTS, payload: response.data.x_total_count})
    dispatch({type: GET_CURRENTPAGE_PRODUCTS, payload: currentPage})
    

    

    dispatch({type: GET_ALL_PRODUCTS_DATA, payload: response.data.List})  

    // dispatch({type: GET_CATEGORY_PRODUCTS, payload: categoryid})

  }

  export default GetProductsReducer;