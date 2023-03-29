import $api from "../http";

export default class ManagerService {
    static async getManagerOrder(currentPage, pageSize){

        
        const resp = await $api.get('/api/managerorder/', {
            params:{currentPage: currentPage, pageSize: pageSize}
        })
        // console.log("resp")
        // console.log(resp)
        return resp
            // .then(response => response.data.accessToken)
    }

    static async getManagerOrderDetail(orderid) {
        const resp = await $api.get('/api/managerorder/', {
            params:{orderid: orderid}
        })
        return resp
    }

    
    static async updateManagerOrderDetail(data) {
        const resp = await $api.post('/api/managerorder/', data)
        return resp
    }


    
}
