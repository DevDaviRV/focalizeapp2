import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({baseURL: 'https://sua-api.com'} );

const apiRequest = async <T>(config: AxiosRequestConfig,): Promise<AxiosResponse<T>> => {
    const response = await api.request<T>(config);
    return response;
};


export {apiRequest}