import $api from "../http";

export default class CabinetService {
    static async getUserProfile(){

        
        const resp = await $api.post('/api/getuser/')
        // console.log("resp")
        // console.log(resp)
        return resp
            // .then(response => response.data.accessToken)
    }

    static async confirmEmail(data){        
        const resp = await $api.post('/api/emailconfirmation/', data)        
        return resp            
    }

    static async changeAdres(data){        
        const resp = await $api.post('/api/changeadres/', data)        
        return resp            
    }

    static async getOrderbyUserId(currentPage, pageSize){
        const resp = await $api.get('/api/getorderbyuser/', {
            params:{currentPage: currentPage, pageSize: pageSize}
        })
        return resp
    }

    
}