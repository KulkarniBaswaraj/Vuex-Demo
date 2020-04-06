import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

axiosInstance.defaults.headers.common['token'] = "xoqttwqemqlnebibsqo123s";

axiosInstance.interceptors.request.use(reqConfig => {
    //Do something before request is sent
    return reqConfig;
}, err => {
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(resConfig => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return resConfig;
}, err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
});

export default axiosInstance;