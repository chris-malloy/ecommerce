import axios from 'axios';

export default function(){
    const axiosPromise = axios.get(`${window.apiHost}/productLines/get`);
    return{
        type: "GET_PRODUCTLINES",
        payload: axiosPromise.data,
    }
}