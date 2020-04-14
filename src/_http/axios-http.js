import axios from 'axios';
import Bus from '../_utils/eventbus';

const axiosInstance = axios.create({
    baseURL: location.origin
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
    return resConfig.data;
}, err => {
    Bus.$emit('isLoading', false);
    return Promise.reject(err.response.data);
});

export default axiosInstance;