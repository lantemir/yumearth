import axios, { AxiosRequestConfig } from "axios";


export const API_URL = `http://127.0.0.1:8000/`

const $api = axios.create()

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})



$api.interceptors.response.use(config => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.post('/api/token/refresh/', {
                refresh: localStorage.getItem('refreshToken')
            })
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Refresh token failed:', e)
            // handle the error, e.g. by redirecting the user to a login page or displaying an error message
            throw e
        }
    }
    throw error
})

export default $api













//старый код:

// const $api = axios.create()


// $api.interceptors.request.use(config => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

// $api.interceptors.response.use((config) => {
//     return config;
// }, (error => {
//     const originalRequest = error.config;
//     if(error.response.status == 401 && error.config && !error.config._isRetry){
//         originalRequest._isRetry = true;
//         try{
//             const response = axios.post('/api/token/refresh/', {
//                 "refresh": localStorage.getItem('refreshToken')
//             })
//             localStorage.setItem('token', response.data.access);
//             localStorage.setItem('refreshToken', response.data.refresh);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН');
            
//         }   
//     }
//     throw error;
// }))

// export default $api;