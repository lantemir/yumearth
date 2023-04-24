import axios from "axios";

import AuthService from "../services/AuthService" 

const SETAUTH = "SETAUTH";
const SETUSER = "SETUSER";
const SET_ERROR_AUTHORITHATION = "SET_ERROR_AUTHORITHATION";
const SETSTAFF = "SETSTAFF";


let initialState = {
    user : {},
    isAuth: false,
    errorMessage: '',
    isStaff: false,
    
};

 const GetAuthReducer = (state = initialState, action  ) =>{
    
    switch(action.type){ // switch ("LOAD") 
      
        case SETAUTH: {
            
            return{ ...state,  isAuth: action.isAuth};
        }

        case SET_ERROR_AUTHORITHATION: {
            return{ ...state,  errorMessage: action.errorMessage};
        }

        case SETUSER: {
            return{ ...state,  isAuth: action.user};
        }

        case SETSTAFF: {
            
            return{ ...state,  isStaff: action.isStaff};
        }
        // case DELETETOKEN: {
        //     return{ ...state,  load: false, token: null};
        // }
        


        // case ERROR: {
        //     return{load: false, token: undefined, error: "произошла ошибка" }
        // }
        default: return state;

    }
}


const setAuth = (isAuth) => ({type: SETAUTH, isAuth})
const setError = (errorMessage) => ({type: SET_ERROR_AUTHORITHATION, errorMessage})
const setStaff= (isStaff) => ({type: SETSTAFF, isStaff})

const setUser = (user) => ({type: SETUSER,  user})


// const checkIsStaff = async() => {
//     const response = await AuthService.isStaff();
//     return response;
// }

export const checkManagerInCabinet = async (dispatch) => {
    const responseIsStaff = await AuthService.isStaff();
    if (responseIsStaff.data.is_staff) {
        dispatch(setStaff(true));
    }
}

export const requestLogin = async (userName, password, dispatch) => { 
    try{      
        // const response = await AuthService.login(userName, password);  
        
        const response = await axios.post('/api/token/', {"username": userName, "password": password})
        localStorage.setItem('token', response.data.access);      
        localStorage.setItem('refreshToken', response.data.refresh);          
        
        const responseIsStaff = await AuthService.isStaff();
        if (responseIsStaff.data.is_staff) {
            dispatch(setStaff(true));
        }
        dispatch(setAuth(true));        
    } catch (e) {     
        dispatch(setError(e.response.data.detail))
    }
}   

export const logout = async (dispatch ) => {  
    try{
        await axios.post('/api/logout/',{
            refresh: localStorage.getItem('refreshToken')
        }).then(response => {
         
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch(setAuth(false));
            dispatch(setStaff(false));  
        }).catch(error => {
            console.log(error)
        })


        // const response = await AuthService.logout();
        // localStorage.removeItem('token');
        // localStorage.removeItem('refreshToken');
        // dispatch(setAuth(false));
        // dispatch(setStaff(false));   
        // console.log(response)   
        
       
        
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}

export default GetAuthReducer;


export const checkAuth = async (dispatch) => {

    

    try{ 
        
        const response = await axios.post('/api/token/refresh/', {
            "refresh": localStorage.getItem('refreshToken')
        } ) 

     
        localStorage.setItem('token', response.data.access);      
        localStorage.setItem('refreshToken', response.data.refresh);  
        dispatch(setAuth(true));        
    } catch (e) {        
        console.log(e.response)
    } finally {
        
    }
}

export const forgetenPassword = async(userName, forgetenEmail,dispatch) => {

    try {

        const data = {
            forgetenEmail:forgetenEmail,
            userName:userName
        }

        const response = await axios.post('/api/emailconfirmation/', data ) 

      

    } catch(e) {

    }
}
