import axios from 'axios';
import {Core} from "../global";

let headers = {};

export const Fetch = axios.create({headers, baseURL: Core.baseUrl});


Fetch.interceptors.response.use((response) => {
    // todo
    return response;
}, (error) => {

    if (error.response.status === 401 || error.response.status === 403) {
        //todo when get error 401
        return Promise.resolve({error});
    }
    return Promise.resolve({error});
});


export const updateFetchToken = (_token: string) => {
    Fetch.defaults.headers['Authorization'] = `Bearer ${_token}`;
};
