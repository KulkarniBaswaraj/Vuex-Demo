import axios from 'axios';
import Bus from '../_utils/eventbus';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

axiosInstance.interceptors.request.use(reqConfig => {
    Bus.$emit('isLoading', true);
    return reqConfig;
}, err => {
    Bus.$emit('isLoading', false);
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(resConfig => {
    Bus.$emit('isLoading', false);
    return resConfig;
}, err => {
    Bus.$emit('isLoading', false);
    return Promise.reject(err);
});

export default axiosInstance;