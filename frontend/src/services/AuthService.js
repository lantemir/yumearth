import $api from "../http";

export default class AuthService {
    static async login(username, password){

        
        const resp = await $api.post('/api/token/', {"username": username, "password": password})
        // console.log("resp")
        // console.log(resp)
        return resp
            // .then(response => response.data.accessToken)
    }

    static async isStaff(){

        
        const resp = await $api.post('/api/isstaff/')
        // console.log("resp")
        // console.log(resp)
        return resp
            // .then(response => response.data.accessToken)
    }

    static async logout(){
        return $api.post('/logout')
            // .then(response => response.data.accessToken)
    }
}

