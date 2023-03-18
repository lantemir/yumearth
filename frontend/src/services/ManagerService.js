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

    
}
