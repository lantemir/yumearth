import axios from "axios";

import CabinetService from "../services/CabinetService" 

const CABINET_SET_USER = "CABINET_SET_USER";




let initialState = {
      user: {},
      
};


const GetCabinetReducer = (state = initialState, action ) => {

    switch(action.type){
        case CABINET_SET_USER: {
            return{...state, user: action.payload}
        }
        default: return state;
    }
}

export const getUser = async (dispatch) => {
    try{
        const response = await CabinetService.getUserProfile();

        console.log(response.data.user);
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
        console.log(response)
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
        console.log(response)
    }
    catch (e) {
        console.log(e)
    }
}

export const sendingEmailRedis = async () => {
    try{
        const response = await axios.post('/api/celerytasks/');
        console.log(response)
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
        console.log(response)
    }
    catch (e) {
        console.log(e)
    }
}

export const getOrderById = async()=>{

    try{
        const response = await CabinetService.getOrdersbyUserId() ;
        console.log(response.data)
    }
    catch (e) {
        console.log(e)
    }
    
}







export default GetCabinetReducer