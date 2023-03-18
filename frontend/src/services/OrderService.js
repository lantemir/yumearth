import $api from "../http";

export default class OrderService {
    static async setOrder(data){

        
        const resp = await $api.post('/api/orders/', data)
        // console.log("resp")
        // console.log(resp)
        return resp
            // .then(response => response.data.accessToken)
    }

    
}
