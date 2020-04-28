import axios from 'axios';
import Bus from '../_utils/eventbus';


const origin = location.origin;
const local = "http://localhost:8080";
const baseUrl = origin == local ? "http://localhost:3000" : origin;


// const baseUrl = "https://indflor.herokuapp.com";

const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

axiosInstance.interceptors.request.use(reqConfig => {
    Bus.$emit('isLoading', true);
    return reqConfig;
}, err => {
    Bus.$emit('isLoading', false);
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(resConfig => {
    Bus.$emit('isLoading', false);
    return resConfig.data;
}, err => {
    Bus.$emit('isLoading', false);
    return Promise.reject(err.response.data);
});

export default axiosInstance;